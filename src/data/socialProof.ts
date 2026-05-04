export type ReviewSource = {
  quote: string;
  label: string;
  source: string;
  note: string;
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
    note: "Asiakkaan Google-profiilista poimittu arvio-ote, toimitettu projektibriefissä.",
  },
  {
    quote: "Laatu pysyy hyvänä kerrasta toiseen.",
    label: "Tasainen laatu",
    source: "Google-arvostelu",
    note: "Usean pitkäaikaisen asiakkaan palautteessa toistuva teema, toimitettu projektibriefissä.",
  },
  {
    quote: "Ainoa paikka, johon poika suostuu mielellään parturiin.",
    label: "Lapsiystävällisyys",
    source: "Google-arvostelu",
    note: "Asiakkaan Google-profiilista poimittu arvio-ote, toimitettu projektibriefissä.",
  },
];

export const verifiedWorkPhotos: WorkPhotoSource[] = [
  {
    title: "Golden Cut -profiilikuva",
    description: "Google Business Profile -kuvasta poimittu liikkeen kuvamateriaali. Vaihda tähän lopullinen, asiakkaan omistama työnäytekuva ennen tuotannon viimeistelyä.",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFCM9wf1FciOwADzOcAUYxM_BG5lsjBXdyCo24o6PtD1m5jV5KUv8q6filNa9n0-Txr_lrm1T8_zWXeNbJ3DVvspclod4PmcDcSzVr_VPIJDku9nHxb4_71LSm1ffDcD9ltSYi3KO8R6FE=w600-h900-k-no",
    source: "Google Business Profile",
    sourceUrl: "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9",
  },
];

export const requiredPhotoSlots = [
  "Skin fade",
  "Mid fade",
  "Taper fade",
  "Parta",
  "Lasten leikkaus",
  "Liikkeen sisäkuva",
];
