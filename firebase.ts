import { Temporal } from "@js-temporal/polyfill";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  where,
  query,
  getDocs,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import {
  dateToInt,
  dateToMonthYear,
  dateToPriorMonthYear,
  intToDate,
} from "./src/utils/fn";
import { DestinationInterface, PlanInterface } from "./src/utils/interfaces";
import { uuidv4 } from "@firebase/util";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqlFyP07FbZfz2sngBpx__gSgWGpiJBD8",
  authDomain: "travel-27010.firebaseapp.com",
  projectId: "travel-27010",
  storageBucket: "travel-27010.appspot.com",
  messagingSenderId: "807819502101",
  appId: "1:807819502101:web:d69a49318bc191f11e641c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//

export const addPlan = async (plan: PlanInterface) => {
  const uid = uuidv4();
  plan.destinations.forEach(async (destination) => {
    try {
      const planInDestinationRef = doc(
        db,
        `destinations/${destination.title}/plans`,
        plan.title + " | " + plan.creator.id
      );

      await setDoc(planInDestinationRef, { ...plan, uid });
    } catch (error) {
      console.log(error);
    }
  });
};

export const fetchPlans = async ({
  startingDate,
  endingDate,
  selectedDestinations,
}: {
  startingDate: number;
  endingDate: number;
  selectedDestinations: DestinationInterface[];
}) => {
  const plans = [];

  for (const destination of selectedDestinations) {
    const sDate = intToDate(startingDate);
    const eDate = intToDate(endingDate);

    const q1 = query(
      collection(db, `destinations/${destination.title}/plans`),
      where("startingDate", "<", endingDate),
      where(
        "startingDate",
        ">=",
        dateToInt(
          Temporal.PlainDate.from({
            day: 1,
            month: sDate.month + 1,
            year: sDate.year,
          })
        )
      )
    );

    const q1Snapshot = await getDocs(q1);
    q1Snapshot.forEach((doc) => {
      plans.push(doc.data());
      console.log("q1", doc.data().title);
    });

    const q2 = query(
      collection(db, `destinations/${destination.title}/plans`),
      where("endingDate", ">", startingDate),
      where("endingDate", "<=", endingDate)
    );

    const q2Snapshot = await getDocs(q2);
    q2Snapshot.forEach((doc) => {
      plans.push(doc.data());
      console.log("q2", doc.data().title);
    });

    const priorMonthYear = dateToPriorMonthYear(intToDate(startingDate));
    for (const monthYear of priorMonthYear) {
      const q3 = query(
        collection(db, `destinations/${destination.title}/plans`),
        where("departureMonthYear", "==", monthYear),
        where("endingDate", ">", endingDate)
      );
      const q3Snapshot = await getDocs(q3);

      q3Snapshot.forEach((doc) => {
        plans.push(doc.data());
        console.log("q3", doc.data().title);
      });
    }
  }

  const filteredPlans = plans.filter(
    (item, index) => plans.findIndex((i) => i.uid === item.uid) === index
  );

  return await filteredPlans;
};
