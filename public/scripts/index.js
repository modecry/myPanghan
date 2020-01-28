const ServicesContnetParams = {
  url: "https://gist.githubusercontent.com/modecrywork/427f419e58130e9b91ad12eb167988cf/raw/82983608f09be778e8a16a3379f58cde53112db6/testdata",
  scheme: SCHEME
}

const  ServicesContent = new StructuredContent(ServicesContnetParams,".services");
ServicesContent.init();