//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract POI {
    uint public MINIMUM_DECIMAL = 6;

    IERC20 public poiToken;

    struct POIMetadata {
        uint id;
        address owner;
        uint createdAt_s;
        uint lat;
        uint lng;
        string description;
    }

    struct POIContributorMetadata {
        address contributor;
        string cid;
        uint contributedAt_s;
    }

    struct POIContributors {
        uint contributorIndex;
        mapping(uint => POIContributorMetadata) records;
    }

    struct POIData {
        POIMetadata metadata;
        POIContributors contributors;
        uint reward;
        uint depositedToken;
        bool isComplete;
    }

    struct RegisterPOIArgs {
        uint lat;
        uint lng;
        uint reward;
        string description;
    }

    uint private poiDataId;
    mapping(uint => POIData) poiDatas;

    event POIRegister(address indexed owner, uint indexed id);
    event POIContributorAdded(address indexed contributor, uint indexed poiDataId, uint contributorIndex);
    event POICompleted(uint indexed poiDataId, bool isComplete);

    constructor(IERC20 _poiToken) {
        poiToken = _poiToken;
    }

    function registerPOI(RegisterPOIArgs calldata args) public {
        require(
            poiToken.allowance(msg.sender, address(this)) >= args.reward,
            "Not enough POI token allowance");

        require(
            poiToken.transferFrom(msg.sender, address(this), args.reward),
            "Failed to transfer POI token");

        poiToken.approve(msg.sender, args.reward);

        poiDatas[poiDataId].metadata.id = poiDataId;
        poiDatas[poiDataId].metadata.owner = msg.sender;
        poiDatas[poiDataId].metadata.createdAt_s = block.timestamp;
        poiDatas[poiDataId].metadata.lat = args.lat;
        poiDatas[poiDataId].metadata.lng = args.lng;
        poiDatas[poiDataId].metadata.description = args.description;
        poiDatas[poiDataId].reward = args.reward;
        poiDatas[poiDataId].depositedToken = args.reward;
        poiDatas[poiDataId].isComplete = false;

        poiDataId += 1;

        emit POIRegister(msg.sender, poiDataId);
    }

    function readPOIMetadataById(uint id) public view returns (POIMetadata memory) {
        return poiDatas[id].metadata;
    }

    function addContribution(uint _poiDataId, string calldata cid) public {
        uint contributorIndex = poiDatas[_poiDataId].contributors.contributorIndex;
        poiDatas[_poiDataId].contributors.records[contributorIndex].contributedAt_s = block.timestamp;
        poiDatas[_poiDataId].contributors.records[contributorIndex].cid = cid;
        poiDatas[_poiDataId].contributors.records[contributorIndex].contributor = msg.sender;

        poiDatas[_poiDataId].contributors.contributorIndex += 1;

        emit POIContributorAdded(msg.sender, _poiDataId, contributorIndex);
    }

    function getAllContributions(uint _poiDataId) public view returns (POIContributorMetadata[] memory) {
        uint contributorIndex = poiDatas[_poiDataId].contributors.contributorIndex;
        POIContributorMetadata[] memory contributions = new POIContributorMetadata[](contributorIndex);

        for (uint i = 0; i < contributorIndex; i++) {
            contributions[i] = poiDatas[_poiDataId].contributors.records[i];
        }

        return contributions;
    }

    function completePOI(uint _poiDataId) public {
        require(
            msg.sender == poiDatas[_poiDataId].metadata.owner,
            "Only owner can complete the POI");

        poiDatas[_poiDataId].isComplete = true;

        emit POICompleted(_poiDataId, true);
    }
}
