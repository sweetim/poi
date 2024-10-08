// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../POI.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IPaymaster, ExecutionResult, PAYMASTER_VALIDATION_SUCCESS_MAGIC} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";
import {IPaymasterFlow} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymasterFlow.sol";
import {TransactionHelper, Transaction} from "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneralPaymaster is IPaymaster, Ownable {
    POI poiContract;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );

        _;
    }

    constructor(address _poiContract) {
        poiContract = POI(_poiContract);
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    )
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory context)
    {
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;

        bytes4 functionSelector = bytes4(_transaction.data[:4]);
        require(
            functionSelector == POI.addContribution.selector,
            "Unsupported function selector"
        );

        (uint256 _poiDataId, string memory _cid) = abi.decode(
            _transaction.data[4:],
            (uint256, string)
        );

        address poiDataId_owner = poiContract
            .readPOIMetadataById(_poiDataId)
            .owner;

        require(
            poiDataId_owner == owner(),
            "poiDataId is not owned by contract"
        );

        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        bytes4 paymasterInputSelector = bytes4(
            _transaction.paymasterInput[0:4]
        );

        require(
            paymasterInputSelector == IPaymasterFlow.general.selector,
            "Unsupported paymaster flow in paymasterParams."
        );

        uint256 requiredETH = _transaction.gasLimit * _transaction.maxFeePerGas;

        (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
            value: requiredETH
        }("");

        require(
            success,
            "Failed to transfer tx fee to the Bootloader. Paymaster balance might not be enough."
        );
    }

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32,
        bytes32,
        ExecutionResult _txResult,
        uint256 _maxRefundedGas
    ) external payable override onlyBootloader {}

    function withdraw(address payable _to) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = _to.call{value: balance}("");
        require(success, "Failed to withdraw funds from paymaster.");
    }

    receive() external payable {}
}
