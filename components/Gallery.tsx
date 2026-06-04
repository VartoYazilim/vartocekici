import { galleryImages, isUsingPlaceholders } from "@/lib/gallery";
import { GalleryClient } from "./GalleryClient";

// Server wrapper: reads gallery data (uses node:fs in lib/gallery) and passes
// it to the client carousel as serializable props. Keeps fs out of the client bundle.
export function Gallery() {
  return (
    <GalleryClient
      images={galleryImages}
      usingPlaceholders={isUsingPlaceholders}
    />
  );
}
