import { CdsDate } from "#cds-models/_";
import { Calculations } from "#cds-models/demo";
import cds from "@sap/cds";

const id = "382fee26-370d-40d2-bd58-49faedc76faf";

async function checkCalculatedDate() {
  const storedDate = (await SELECT.one.from(Calculations, id))?.calculatedOn;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(storedDate as string)) {
    throw new Error(
      `Stored Date string "${storedDate}" should actually be in format "yyyy-mm-dd"`
    );
  } else {
    console.log(`Stored Date string in column "calculatedOn": ${storedDate}`);
  }
}

cds.on("served", async () => {
  const calculatedOn = new Date().toISOString() as CdsDate;

  // 1) test INSERT with Date string e.g. 2018-01-01T15:00:00.000Z into `Date` column
  await INSERT.into(Calculations).entries({
    ID: id,
    calculatedOn,
  });
  console.log("> Testing DateTime to Date conversion during INSERT");
  await checkCalculatedDate();

  await UPDATE(Calculations, id).set({ calculatedOn: null });

  // 2) test UPDATE with Date string e.g. 2018-01-01T15:00:00.000Z into `Date` column
  await UPDATE(Calculations, id).set({
    calculatedOn,
  });
  console.log("> Testing DateTime to Date conversion during UPDATE");
  await checkCalculatedDate();
});
