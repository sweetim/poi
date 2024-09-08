import {
  POI as POIContract,
  POIContributorAdded,
  POIRegister,
} from "../generated/POI/POI"

import {
  POIContributorMetadata,
  POIMetadata,
} from "../generated/schema"

export function handlePOIRegister(event: POIRegister): void {
  const poiContract = POIContract.bind(event.address)
  const metadata = poiContract.readPOIMetadataById(event.params.id)

  let poiMetadata = new POIMetadata(event.params.id.toHex())
  poiMetadata.owner = event.params.owner
  poiMetadata.createdAt_s = metadata.createdAt_s
  poiMetadata.lat = metadata.lat
  poiMetadata.lng = metadata.lng
  poiMetadata.description = metadata.description

  poiMetadata.save()
}

export function handlePOIContributorAdded(event: POIContributorAdded): void {
  const poiContract = POIContract.bind(event.address)
  const poiContributors = poiContract.getAllContributions(event.params.poiDataId)

  let poiContributorMetadata = new POIContributorMetadata(
    `${event.params.poiDataId.toHex()}-${event.params.contributorIndex.toHex()}`,
  )

  poiContributorMetadata.poiDataId = event.params.poiDataId
  poiContributorMetadata.contributor = event.params.contributor
  poiContributorMetadata.cid = poiContributors[
    event.params.contributorIndex.toU32()
  ].cid

  poiContributorMetadata.contributedAt_s = poiContributors[
    event.params.contributorIndex.toU32()
  ].contributedAt_s

  poiContributorMetadata.save()
}
