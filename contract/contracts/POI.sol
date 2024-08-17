//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract POI {
    uint public MINIMUM_DECIMAL = 6;

    uint private poiId;

    struct POIMetadata {
        uint id;
        address owner;
        uint createdAt;
        uint lat;
        uint lng;
        uint reward;
        string description;
        bool isCompleted;
    }

    struct RegisterPOIArgs {
        uint lat;
        uint lng;
        uint reward;
        string description;
    }

    mapping(uint => POIMetadata) poiMetadatas;

    event POIRegister(
        address indexed owner,
        uint indexed id
    );

    function registerPOI(RegisterPOIArgs calldata args) public {
        poiId += 1;

        poiMetadatas[poiId].id = poiId;
        poiMetadatas[poiId].owner = msg.sender;
        poiMetadatas[poiId].createdAt = block.timestamp;
        poiMetadatas[poiId].lat = args.lat;
        poiMetadatas[poiId].lng = args.lng;
        poiMetadatas[poiId].reward = args.reward;
        poiMetadatas[poiId].description = args.description;
        poiMetadatas[poiId].isCompleted = false;

        emit POIRegister(msg.sender, poiId);
    }
}
