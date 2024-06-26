const initializeApp = () => {
  return new Promise((resolve, reject) => {
    ZOHO.embeddedApp.on("PageLoad", async function (onloadData) {
      ZOHO.CRM.UI.Resize({height:"100%",width:"100%"}).then(function(data){
        console.log(data);
      });
      resolve(onloadData);
    });
    ZOHO.embeddedApp.init();
  });
};

const getData = async (entity) => {
  await initializeApp();
  try {
    const response = await ZOHO.CRM.API.getAllRecords({
      Entity: entity,
      sort_order: "asc",
      per_page: 200,
      page: 1,
    });
    return response
  } catch (error) {
    throw error;
  }
};

const getMetaData = async (Entity) => {
  await initializeApp();
  try {
    const response = await ZOHO.CRM.META.getFields({Entity});
    return response
  } catch (error) {
    throw error;
  }
};
