export type ReviewSource = {
  quote: string;
  label: string;
  source: string;
};

export type WorkPhotoSource = {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  sourceUrl: string;
};

export const verifiedReviews: ReviewSource[] = [
  {
    quote: "Todella nopea ja tarkka tukan leikkaus.",
    label: "Nopeus ja tarkkuus",
    source: "Google-arvostelu",
  },
  {
    quote: "Laatu pysyy hyvänä kerrasta toiseen.",
    label: "Tasainen työnjälki",
    source: "Google-arvostelu",
  },
  {
    quote: "Ainoa paikka, johon poika suostuu mielellään parturiin.",
    label: "Lapsiystävällinen palvelu",
    source: "Google-arvostelu",
  },
];

export const verifiedWorkPhotos: WorkPhotoSource[] = [
  {
    title: "Golden Cut Parturi",
    description: "Google-profiilin kuvamateriaalia Golden Cut Parturista Espoon keskuksessa.",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFCM9wf1FciOwADzOcAUYxM_BG5lsjBXdyCo24o6PtD1m5jV5KUv8q6filNa9n0-Txr_lrm1T8_zWXeNbJ3DVvspclod4PmcDcSzVr_VPIJDku9nHxb4_71LSm1ffDcD9ltSYi3KO8R6FE=w600-h900-k-no",
    source: "Google Business Profile",
    sourceUrl: "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9",
  },
];
