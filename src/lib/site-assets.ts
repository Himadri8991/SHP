/**
 * CENTRALIZED ASSET MAP — Sky-High Properties
 *
 * All homepage asset paths are defined here.
 * To replace an asset, change the path here only.
 * No asset paths should be scattered through components.
 */

const BASE_BRAND = "/assets/sky-high/brand";
const BASE_IMAGES = "/assets/sky-high/homepage/images";
const BASE_VIDEOS = "/assets/sky-high/homepage/videos";

export const BRAND_ASSETS = {
  /** Logo on light/stone backgrounds (dark text, transparent bg) */
  logoLight: `${BASE_BRAND}/logo-transparent-dark.png`,
  /** Logo on dark/video/navy backgrounds (white text, transparent bg) */
  logoDark: `${BASE_BRAND}/logo-transparent-white.png`,
} as const;

export const HOMEPAGE_IMAGES = {
  /** 01 — Architectural exterior, golden hour, signature tower residence */
  exteriorMaster: `${BASE_IMAGES}/01-exterior-master.webp`,
  /** 02 — Double-height living room, floor-to-ceiling glazing, staircase */
  livingRoomMaster: `${BASE_IMAGES}/02-living-room-master.webp`,
  /** 03 — Terrace terrace, glass railing, hillside panorama */
  terraceViewMaster: `${BASE_IMAGES}/03-terrace-view-master.webp`,
  /** 04 — Master bedroom, warm light, oak slatting, sheer curtains */
  masterBedroomMaster: `${BASE_IMAGES}/04-master-bedroom-master.webp`,
  /** 05 — Evening exterior, amber interior light, indigo sky */
  eveningExteriorMaster: `${BASE_IMAGES}/05-evening-exterior-master.webp`,
} as const;

export const HOMEPAGE_VIDEOS = {
  /**
   * 01 — Exterior approach / arrival
   * Interaction model: AUTOPLAY MUTED LOOP (hero reliability)
   */
  exteriorApproach: `${BASE_VIDEOS}/01-exterior-approach.mp4`,
  /**
   * 02 — Exterior to living room transition
   * Interaction model: CONTROLLED PLAY-ON-ENTER
   */
  exteriorToLiving: `${BASE_VIDEOS}/02-exterior-to-living.mp4`,
  /**
   * 03 — Living room to view reveal
   * Interaction model: CONTROLLED PLAY-ON-ENTER
   */
  livingToView: `${BASE_VIDEOS}/03-living-to-view.mp4`,
  /**
   * 04 — Signature vertical architecture & staircase
   * Interaction model: CONTROLLED PLAY-ON-ENTER
   */
  duplexStaircase: `${BASE_VIDEOS}/02-exterior-to-living.mp4`,
  /**
   * 05 — Master suite interior
   * Interaction model: CONTROLLED PLAY-ON-ENTER
   */
  masterSuite: `${BASE_VIDEOS}/05-master-suite.mp4`,
  /**
   * 06 — Evening exterior finale
   * Interaction model: CONTROLLED PLAY-ON-ENTER, hold final frame
   * Note: Loop only if footage loops invisibly. Inspect before forcing loop.
   */
  eveningFinale: `${BASE_VIDEOS}/06-evening-finale.mp4`,
} as const;

export type HomepageImageKey = keyof typeof HOMEPAGE_IMAGES;
export type HomepageVideoKey = keyof typeof HOMEPAGE_VIDEOS;
