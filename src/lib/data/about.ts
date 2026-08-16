/* ── About Data Service Functions ─────────────────────────────────── */
import { SCHOOL_INFO } from "@/data/about/school";
import { getVisibleHistory } from "@/data/about/history";
import { MISSION_DATA } from "@/data/about/mission";
import { VISION_DATA } from "@/data/about/vision";
import { getVisibleValues } from "@/data/about/values";
import { DIRECTOR_MESSAGE } from "@/data/about/director";
import { getVisibleTeamMembers } from "@/data/team";

/* ── School Information Functions ───────────────────────────────── */
export function getSchoolInfo() {
  return SCHOOL_INFO;
}

/* ── History Functions ───────────────────────────────────────────── */
export function getHistory() {
  return getVisibleHistory();
}

/* ── Mission Functions ────────────────────────────────────────────── */
export function getMission() {
  return MISSION_DATA;
}

/* ── Vision Functions ────────────────────────────────────────────── */
export function getVision() {
  return VISION_DATA;
}

/* ── Values Functions ───────────────────────────────────────────── */
export function getValues() {
  return getVisibleValues();
}

/* ── Director Message Functions ─────────────────────────────────── */
export function getDirectorMessage() {
  return DIRECTOR_MESSAGE;
}

/* ── Team Functions ────────────────────────────────────────────── */
// export function getTeam() {
//   return getVisibleTeamMembers();
// }

/* ── Teaching Staff Functions ─────────────────────────────────────── */
export { getTeachingStaff, getTeachingStaffById } from "@/data/about/equipe";
