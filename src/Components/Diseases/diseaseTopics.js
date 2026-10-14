import STDs from "./STD Overview/overview";
import Chlamydia from "./Chlamydia/Chlamydia";
import ChlamydiaSymptoms from "./Chlamydia/Chlamydia2";
import ChlamydiaTreatment from "./Chlamydia/Chlamydia3";
import Gonorrhea from "./Gonorrhea/Gonorrhea";
import GonorrheaSymptoms from "./Gonorrhea/Gonorrhea2";
import GonorrheaTreatment from "./Gonorrhea/Gonorrhea3";
import HepatitisA from "./Hepatitis A/Hepatitis A";
import HepatitisASymptoms from "./Hepatitis A/Hepatitis A2";
import HepatitisATreatment from "./Hepatitis A/Hepatitis A3";
import HepatitisB from "./Hepatitis B/Hepatitis B";
import HepatitisBSymptoms from "./Hepatitis B/Hepatitis B2";
import HepatitisBTreatment from "./Hepatitis B/Hepatitis B3";
import HepatitisC from "./Hepatitis C/Hepatitis C";
import HepatitisCSymptoms from "./Hepatitis C/Hepatitis C2";
import HepatitisCTreatment from "./Hepatitis C/Hepatitis C3";
import GenitalHerpes from "./Genital Herpes/Genital Herpes";
import GenitalHerpesSymptoms from "./Genital Herpes/Genital Herpes2";
import HerpesSymptomsMen from "./Genital Herpes/Genital Herpes3";
import HerpesSymptomsWomen from "./Genital Herpes/Genital Herpes4";
import GenitalHerpesTreatment from "./Genital Herpes/Genital Herpes5";
import HSV2Symptoms from "./Genital Herpes/Genital Herpes6";
import OralHerpes from "./Oral Herpes/Oral Herpes";
import OralHerpesSymptoms from "./Oral Herpes/Oral Herpes2";
import OralHerpesTreatment from "./Oral Herpes/Oral Herpes3";
import HSV1Symptoms from "./Oral Herpes/Oral Herpes4";
import ColdSoresSymptoms from "./Oral Herpes/Oral Herpes5";
import HIV from "./HIV/HIV";
import HIVSymptoms from "./HIV/HIV2";
import HIVSymptomsMen from "./HIV/HIV3";
import HIVSymptomsWomen from "./HIV/HIV4";
import AIDSSymptoms from "./HIV/HIV5";
import HIVRash from "./HIV/HIV6";
import HIVTreatment from "./HIV/HIV7";
import Syphilis from "./Syphilis/Syphilis";
import SyphilisSymptoms from "./Syphilis/Syphilis2";
import SyphilisTreatment from "./Syphilis/Syphilis3";
import RPRTesting from "./Syphilis/Syphilis4";
import SyphilisRash from "./Syphilis/Syphilis5";
import UnderstandingSTDs from "./Symptoms/STD Symptoms";
import MaleSTD from "./Symptoms in Men/Overview";
import JockItch from "./Symptoms in Men/JockItch";
import PainfulUrination from "./Symptoms in Men/Painful Urination";
import PenisBumps from "./Symptoms in Men/Penis Bumps";
import PenileDischarge from "./Symptoms in Men/Penile Discharge";
import PenisRash from "./Symptoms in Men/Penis Rash";
import PenisSpots from "./Symptoms in Men/Spots on Penis";
import PenisPimples from "./Symptoms in Men/Pimple on Penis";
import BumpsOnTesticles from "./Symptoms in Men/Lump on Testicle";
import TesticlePain from "./Symptoms in Men/Testicle Pain";
import TesticleSwelling from "./Symptoms in Men/Testicle Swelling";
import FemaleSTD from "./Symptoms in Women/Overview";
import VaginalBumps from "./Symptoms in Women/Vaginal Bumps";
import VaginalBurning from "./Symptoms in Women/Vaginal Burning";
import VaginalDischarge from "./Symptoms in Women/Vaginal Discharge";
import VaginalItching from "./Symptoms in Women/Vanginal Itching";
import VaginalOdor from "./Symptoms in Women/Vaginal Odor";

/*
 * Every disease article in the library, grouped exactly as it was grouped in the
 * old two-sidebar layout. `slug` drives the /diseases/:topic route, so the slugs
 * that were already routable (overview, chlamydia, gonorrhea, hiv, oral-herpes,
 * symptoms, syphilis, hep-a, hep-b, hep-c, genital-herpes) are kept unchanged.
 */
export const diseaseSections = [
  {
    label: "STDs & Symptoms",
    groups: [
      {
        title: "STD Overview",
        topics: [{ slug: "overview", title: "Overview", component: STDs }],
      },
      {
        title: "Chlamydia",
        topics: [
          { slug: "chlamydia", title: "Chlamydia Overview", component: Chlamydia },
          { slug: "chlamydia-symptoms", title: "Chlamydia Symptoms", component: ChlamydiaSymptoms },
          { slug: "chlamydia-testing-treatment", title: "Testing & Treatment", component: ChlamydiaTreatment },
        ],
      },
      {
        title: "Gonorrhea",
        topics: [
          { slug: "gonorrhea", title: "Gonorrhea Overview", component: Gonorrhea },
          { slug: "gonorrhea-symptoms", title: "Gonorrhea Symptoms", component: GonorrheaSymptoms },
          { slug: "gonorrhea-testing-treatment", title: "Testing & Treatment", component: GonorrheaTreatment },
        ],
      },
      {
        title: "Hepatitis A",
        topics: [
          { slug: "hep-a", title: "Hepatitis A Overview", component: HepatitisA },
          { slug: "hep-a-symptoms", title: "Hepatitis A Symptoms", component: HepatitisASymptoms },
          { slug: "hep-a-testing-treatment", title: "Testing & Treatment", component: HepatitisATreatment },
        ],
      },
      {
        title: "Hepatitis B",
        topics: [
          { slug: "hep-b", title: "Hepatitis B Overview", component: HepatitisB },
          { slug: "hep-b-symptoms", title: "Hepatitis B Symptoms", component: HepatitisBSymptoms },
          { slug: "hep-b-testing-treatment", title: "Testing & Treatment", component: HepatitisBTreatment },
        ],
      },
      {
        title: "Hepatitis C",
        topics: [
          { slug: "hep-c", title: "Hepatitis C Overview", component: HepatitisC },
          { slug: "hep-c-symptoms", title: "Hepatitis C Symptoms", component: HepatitisCSymptoms },
          { slug: "hep-c-testing-treatment", title: "Testing & Treatment", component: HepatitisCTreatment },
        ],
      },
      {
        title: "Genital Herpes",
        topics: [
          { slug: "genital-herpes", title: "Genital Herpes Overview", component: GenitalHerpes },
          { slug: "genital-herpes-symptoms", title: "Genital Herpes Symptoms", component: GenitalHerpesSymptoms },
          { slug: "genital-herpes-symptoms-men", title: "Symptoms in Men", component: HerpesSymptomsMen },
          { slug: "genital-herpes-symptoms-women", title: "Symptoms in Women", component: HerpesSymptomsWomen },
          { slug: "genital-herpes-testing-treatment", title: "Testing & Treatment", component: GenitalHerpesTreatment },
          { slug: "hsv-2-symptoms", title: "HSV-2 Symptoms", component: HSV2Symptoms },
        ],
      },
      {
        title: "Oral Herpes",
        topics: [
          { slug: "oral-herpes", title: "Oral Herpes Overview", component: OralHerpes },
          { slug: "oral-herpes-symptoms", title: "Oral Herpes Symptoms", component: OralHerpesSymptoms },
          { slug: "oral-herpes-testing-treatment", title: "Testing & Treatment", component: OralHerpesTreatment },
          { slug: "hsv-1-symptoms", title: "HSV-1 Symptoms", component: HSV1Symptoms },
          { slug: "cold-sores-symptoms", title: "Cold Sores Symptoms", component: ColdSoresSymptoms },
        ],
      },
      {
        title: "HIV",
        topics: [
          { slug: "hiv", title: "HIV Overview", component: HIV },
          { slug: "hiv-symptoms", title: "HIV Symptoms", component: HIVSymptoms },
          { slug: "hiv-symptoms-men", title: "HIV Symptoms in Men", component: HIVSymptomsMen },
          { slug: "hiv-symptoms-women", title: "HIV Symptoms in Women", component: HIVSymptomsWomen },
          { slug: "aids-symptoms", title: "AIDS Symptoms", component: AIDSSymptoms },
          { slug: "hiv-rash", title: "HIV Rash", component: HIVRash },
          { slug: "hiv-testing-treatment", title: "Testing & Treatment", component: HIVTreatment },
        ],
      },
      {
        title: "Syphilis",
        topics: [
          { slug: "syphilis", title: "Syphilis Overview", component: Syphilis },
          { slug: "syphilis-symptoms", title: "Syphilis Symptoms", component: SyphilisSymptoms },
          { slug: "syphilis-testing-treatment", title: "Testing & Treatment", component: SyphilisTreatment },
          { slug: "rpr-testing", title: "RPR Testing", component: RPRTesting },
          { slug: "syphilis-rash", title: "Syphilis Rash", component: SyphilisRash },
        ],
      },
    ],
  },
  {
    label: "STD Symptoms",
    groups: [
      {
        title: "STD Symptoms",
        topics: [{ slug: "symptoms", title: "Symptoms", component: UnderstandingSTDs }],
      },
      {
        title: "Symptoms in Men",
        topics: [
          { slug: "symptoms-in-men", title: "Overview", component: MaleSTD },
          { slug: "jock-itch", title: "Jock Itch STD", component: JockItch },
          { slug: "painful-urination", title: "Painful Urination", component: PainfulUrination },
          { slug: "penis-bumps", title: "Penis Bumps", component: PenisBumps },
          { slug: "penile-discharge", title: "Penile Discharge", component: PenileDischarge },
          { slug: "penis-rash", title: "Penis Rash", component: PenisRash },
          { slug: "spots-on-penis", title: "Spots on Penis", component: PenisSpots },
          { slug: "pimple-on-penis", title: "Pimple on Penis", component: PenisPimples },
          { slug: "lump-on-testicles", title: "Lump on Testicles", component: BumpsOnTesticles },
          { slug: "testicle-pain", title: "Testicle Pain", component: TesticlePain },
          { slug: "testicle-swelling", title: "Testicle Swelling", component: TesticleSwelling },
        ],
      },
      {
        title: "Symptoms in Women",
        topics: [
          { slug: "symptoms-in-women", title: "Overview", component: FemaleSTD },
          { slug: "vaginal-bumps", title: "Vaginal Bumps", component: VaginalBumps },
          { slug: "vaginal-burning", title: "Vaginal Burning", component: VaginalBurning },
          { slug: "vaginal-discharge", title: "Vaginal Discharge", component: VaginalDischarge },
          { slug: "vaginal-itching", title: "Vaginal Itching", component: VaginalItching },
          { slug: "vaginal-odor", title: "Vaginal Odor", component: VaginalOdor },
        ],
      },
    ],
  },
];

export const defaultTopicSlug = "overview";

/** Finds the section/group/topic that `slug` belongs to; unknown slugs fall back to the first topic. */
export function findTopic(slug) {
  for (const section of diseaseSections) {
    for (const group of section.groups) {
      const topic = group.topics.find(candidate => candidate.slug === slug);
      if (topic) return { section, group, topic };
    }
  }
  const [section] = diseaseSections;
  const [group] = section.groups;
  return { section, group, topic: group.topics[0] };
}
