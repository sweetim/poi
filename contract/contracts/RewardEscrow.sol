//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract RewardEscrow {
    address public depository;
    mapping(uint256 => address) public contributors;
    uint public contributorIndex;
    address public arbiter;

    constructor(address _arbiter) {
        depository = msg.sender;
    }

    function addContributors(address _contributors) public {

    }
}
