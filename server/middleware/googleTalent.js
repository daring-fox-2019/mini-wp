const {google} = require('googleapis');
console.log('lah yo');

const PROJECT_ID = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log(PROJECT_ID);

module.exports = {
    googleTalent : function (req, res, next) {
        
        google.auth.getApplicationDefault((err, authClient) => {
          if (err) {
            console.error('Failed to acquire credentials');
            console.error(err);
            console.log('hihere');
            
            return;

          }
        
          if (authClient.createScopedRequired && authClient.createScopedRequired()) {
              console.log('halo');
              
            authClient = authClient.createScoped([
              'https://www.googleapis.com/auth/jobs',
            ]);
          }
        
          // Instantiates an authorized client
          const jobServiceClient = google.jobs({
            version: 'v3',
            auth: authClient,
          });
        
          const request = {
            parent: `projects/hacktiv8-237500`,
          };
        
          // Lists companies
          jobServiceClient.projects.companies.list(request, (err, result) => {
            console.log(result, 'APA HASILNYA DARI GOOGLEEEEEE');
            
            if (err) {
              console.error(`Failed to retrieve companies! ${err}`);
              throw err;
            }
        
            console.log(`Request ID: ${result.data.metadata.requestId}`);
        
            const companies = result.data.companies || [];
        
            if (companies.length) {
              console.log('Companies:');
              companies.forEach(company => console.log(company.name));
            } else {
              console.log(`No companies found.`);
            }
          });
        });
    }
}