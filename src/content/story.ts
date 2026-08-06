/**
 * All the real, personal content for the site lives here — separate from
 * the components so you can edit your story without touching any layout
 * or animation code. Replace every placeholder below with your own words.
 */

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    date: "Feb 7",
    title: "The First Hello",
    description: "Replace this with how you two first met or first spoke.",
  },
  {
    date: "Feb 14",
    title: "Something Different",
    description: "Replace this with the moment you realized this was special.",
  },
  {
    date: "Mar 6",
    title: "Officially Us",
    description: "Replace this with the day you made it official.",
  },
  {
    date: "Aug 7",
    title: "Tonight",
    description: "Replace this with what today means to the two of you.",
  },
];

export interface GalleryItem {
  caption: string;
  src?: string; // put an image at /public/images/... and set this
}

export const galleryPlaceholders: GalleryItem[] = [
  { caption: "Add your favorite photo" },
  { caption: "Add your favorite photo" },
  { caption: "Add your favorite photo" },
  { caption: "Add your favorite photo" },
  { caption: "Add your favorite photo" },
  { caption: "Add your favorite photo" },
];

export const letterParagraphs: string[] = [
  "My love,",
  "Replace this paragraph with the opening of your letter — however you'd greet them.",
  "Replace this paragraph with a memory or feeling you want to share.",
  "Replace this closing paragraph with how you feel about the future.",
  "Forever yours,",
];

export const reasons: string[] = [
  "Replace with reason #1 you love them",
  "Replace with reason #2 you love them",
  "Replace with reason #3 you love them",
  "Replace with reason #4 you love them",
  "Replace with reason #5 you love them",
  "Replace with reason #6 you love them",
];

export const dreams: string[] = [
  "Replace with a dream you share — a trip, a home, a milestone",
  "Replace with another future dream together",
  "Replace with another future dream together",
  "Replace with another future dream together",
];

export const proposalQuestion = "Will you be mine, forever?";
