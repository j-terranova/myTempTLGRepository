import referenceDataCtrl from "./../server/controllers/referenceData.controller";

const loadData = () => {
  console.log("initialLoadData - start loading data");
  referenceDataCtrl.loadReferenceData();
  console.log("initialLoadData - finish loading data");
};

export { loadData };
