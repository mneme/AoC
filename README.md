iCLEAN
=====

iCLEAN project

sessioner < 1 minuter = kasta (acct_session_time)
Stängda och äldre än 7 dagar ska flyttas


--- radacct_smartedge_bng ---
#select * from radacct_smartedge_bng where acct_status_type = 'STOP' and acct_session_time < 60 LIMIT 100;
select * from radacct_smartedge_bng where acct_status_type = 'STOP' and acctstoptime < DATE_SUB(now(), INTERVAL 7 DAY) limit 100;

acct_session_time < 60 = delete

--- radacct_cisco_bng ---
#select * from radacct_cisco_bng where acct_status_type = 'STOP' and acct_session_time < 60 LIMIT 100;
select * from radacct_cisco_bng where acct_status_type = 'STOP' and acctstoptime < DATE_SUB(now(), INTERVAL 7 DAY) limit 100;

acct_session_time < 60 = delete

--- radacct_asr_bng ---
#select * from radacct_asr_bng where acct_current_status = 'STOP' and acctsessiontime < 60 LIMIT 100;
select * from radacct_asr_bng where acct_current_status = 'STOP' and acctstoptime < DATE_SUB(now(), INTERVAL 7 DAY) limit 100;

acctsessiontime < 60 = delete



itopDb
abuseDb

getRows(type)
  .then(function(){rows}{
      return deleteRows(type, rows)
    })
  .then(function(){
    return filterRows(type, rows)
  })
  .then(function(ids){
    return storeRows(type, rows);
  });


function getRows(type)