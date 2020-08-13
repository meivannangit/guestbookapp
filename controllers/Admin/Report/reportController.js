var connection = require('../../../config');
var commonFunction = require('../../commonFunction');
var _ = require('lodash')
module.exports = {


    getpaymentaccount: async (req, res) => {
         
        var paymentaccountQuery="SELECT *,a.id as account_id,a.account_name as account_name  FROM accounts as a inner join account_types as ac on ac.id=a.account_type_id where ac.id =1 group by ac.id";
        var paymentaccountData=await commonFunction.getQueryResults(paymentaccountQuery);


        if(paymentaccountData.length > 0 )
        {

            res.json({status:1,message:'payment account list',paymentaccountData})
            
        }
        else
        {

            res.json({status:0,message:'No payment account list'})
            
        }


    },
    ProfitandLossreport: async (req, res) => {
        let { start_date, end_date, report_type } = req.body
        let accountObject = {};
        let accountNameObject = {}
        let consignmentObject = {};
        let billObject = {};
        var bill = [];
        let incomes = [];
        let expense = []
        let incomepaymentObject=[];
        let expensepaymentObject=[];
        let expenseObject = {}
        let costofgoodsexpense=[];
        let operatingexpensetransaction=[];
        let costofgoodsexpensepayment=[];
        let operatingexpensepayment=[]
        var paymentdetails;

        var finalResponse = [];
        let accounttypeQuery = "Select *,at.id as accountypeid,at.name as accounttypename,a.id as accountid,a.account_name as accountname from accounts as a left join account_types as at on at.id=a.account_type_id ";

        let accountdata = await commonFunction.getQueryResults(accounttypeQuery);

        accountdata.forEach(element => {
            accountObject[element.accountypeid] = element.accounttypename;
            accountNameObject[element.accountid] = element.accountname
        });
        //paymentQuery
        // let paymentQuery = "Select *,p.account as account_id from payments as p left join accounts as a on p.account=a.id  inner join account_types as at on at.id=a.account_type_id where p.created_date >= '" + start_date + "' AND p.created_date  <= '" + end_date + "' group by p.id"
        // let paymentData = await commonFunction.getQueryResults(paymentQuery);




        // //billdetailsQuery
        // let billDetailsQuery = "Select * from bill as b inner join  bill_details as bd on b.id=bd.bill_id inner join accounts as ac on ac.id=bd.expense_category where b.bill_date >= '" + start_date + "' AND b.bill_date  <= '" + end_date + "' and b.isdelete = 0 ";
        // let billDetailsdata = await commonFunction.getQueryResults(billDetailsQuery);

        let transactionQuery = " Select *,a.account as account_id from  account_statements as a left join accounts as ac on ac.id=a.account  where a.created_on >= '" + start_date + "' AND a.created_on  <= '" + end_date + "' group by a.id ";
        let transactionData = await commonFunction.getQueryResults(transactionQuery);
        // paymentData.forEach(element => {

        //     if(element.type=='Income')

        //     {

        //         incomepaymentObject.push(element)
        //     }
        //     if(element.type=='Expense')

        //     {
        //         // if (expensepaymentObject[element.account_type_id==undefined]) {
        //         //     expensepaymentObject[element.account_type_id]=[];
        //         // }


        //         expensepaymentObject.push(element)
        //     }



        // });

        // expensepaymentObject.forEach(element => {
        //     if (element.account_type_id == 24) {
    
        //         operatingexpensepayment.push(element)
        //     }
        //     if (element.account_type_id == 25) {
        //         costofgoodsexpensepayment.push(element)
        //     }
           
        // });



        transactionData.forEach(element => {
            if (element.type =='Income') {
                incomes.push(element)
            }
            if (element.type =='Expense') {
                expense.push(element)
            }
        });



        // billDetailsdata.forEach(item => {
        //     item.account_id = item.expense_category;
        // });
        // accountdata.forEach(item1 => {
        //     billDetailsdata.forEach(item2 => {


        //   });
        // });


        //console.log('cost', paymentQuery)


        // if (billDetailsdata.length > 0) {
        //     var billdetails =
        //         _(billDetailsdata)
        //             .groupBy('account_id')
        //             .map((objs, key) => ({
        //                 'account_id': key,
        //                 'account_type_id': _.get(objs[0], 'account_type_id'),
        //                 'account_type_name': accountObject[_.get(objs[0], 'account_type_id')],
        //                 'account_id_name': accountNameObject[key],
        //                 'total': _.sumBy(objs, function (day) {

        //                     return day.debit - day.credit;

        //                 })
        //             }))
        //             .value();



        //     billdetails.forEach(element => {

        //         if (billObject[element.account_type_id] == undefined) {

        //             billObject[element.account_type_id] = [];
        //         }
        //         billObject[element.account_type_id].push(element)


        //     });

        // }



        // expense.forEach(element => {

        //     if (expenseObject[element.account_type_id] == undefined) {

        //         expenseObject[element.account_type_id] = [];
        //     }
        //     expenseObject[element.account_type_id].push(element)



        // });



        

        expense.forEach(element => {

                if (element.account_type_id == 24) {
    
                    operatingexpensetransaction.push(element)
                }
                if (element.account_type_id == 25) {
                    costofgoodsexpense.push(element)
                }
               
    
    
            });


         
            

             
            // var costoofgoodspaymentdetails = _(costofgoodsexpensepayment)
            // .groupBy('account_id')
            // .map((objs, key) => ({
            //     'account_id': key,
            //     'account_type_id': _.get(objs[0], 'account_type_id'),
            //     'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
            //     'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
            //     'total': _.sumBy(objs, function (day) {

            //         return day.debit - day.credit;

            //     })
            // }))
            // .value();

            // var operationexpensepaymentdetails = _(operatingexpensepayment)
            // .groupBy('account_id')
            // .map((objs, key) => ({
            //     'account_id': key,
            //     'account_type_id': _.get(objs[0], 'account_type_id'),
            //     'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
            //     'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
            //     'total': _.sumBy(objs, function (day ,n) {

            //         return day.debit - day.credit;

            //     })
            // }))
            // .value();
            var costoofgoodsdetails = _(costofgoodsexpense)
            .groupBy('account_id')
            .map((objs, key) => ({
                'account_id': key,
                'account_type_id': _.get(objs[0], 'account_type_id'),
                'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
                'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
                'total': _.sumBy(objs, function (day) {

                    return day.debit - day.credit;

                })
            }))
            .value();

            var operationexpensedetails = _(operatingexpensetransaction)
            .groupBy('account_id')
            .map((objs, key) => ({
                'account_id': key,
                'account_type_id': _.get(objs[0], 'account_type_id'),
                'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
                'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
                'total': _.sumBy(objs, function (day) {

                    return day.debit - day.credit;

                })
            }))
            .value();
        var transactiondetails = _(incomes)
            .groupBy('account_id')
            .map((objs, key) => ({
                'account_id': key,
                'account_type_id': _.get(objs[0], 'account_type_id'),
                'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
                'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
                'total': _.sumBy(objs, function (day) {

                    return day.credit - day.debit;

                })
            }))
            .value();

        // if (paymentData.length > 0) {
        //     paymentdetails =
        //         _(incomepaymentObject)
        //             .groupBy('account_id')
        //             .map((objs, key) => ({
        //                 'account_id': key,
        //                 'account_type_id': _.get(objs[0], 'account_type_id'),
        //                 'account_type_name': accountObject[_.get(objs[0], 'account_type_id')] ? accountObject[_.get(objs[0], 'account_type_id')] : '',
        //                 'account_id_name': accountNameObject[key] ? accountNameObject[key] : '',
        //                 'total': _.sumBy(objs, function (day) {

        //                     return day.credit - day.debit;

        //                 })
        //             }))
        //             .value();
        // }


        let incomearray = [];
        let Costofgoodsarray = [];
        let operatingexpensearray = []

         
        let income2=transactionData.length > 0?transactiondetails: '';
      console.log( 'type',typeof(paymentdetails))
        incomearray.push(...income2);
        // var carray = billDetailsdata.length == 0 ? '' : billObject[24];
        // var oarray = billDetailsdata.length == 0 ? '' : billObject[25];
        var cexpensearray = costoofgoodsdetails.length > 0 ? costoofgoodsdetails : '';
        var oexpensearray = operationexpensedetails.length > 0 ? operationexpensedetails : '';

        // var cparray= paymentData.length > 0  &&  costofgoodsexpensepayment.length  > 0? costoofgoodspaymentdetails : '';
        // var oparray=paymentData.length > 0 &&  operationexpensepaymentdetails.length  > 0 ? operationexpensepaymentdetails : '';
        Costofgoodsarray.push(...cexpensearray);
        operatingexpensearray.push(...oexpensearray);
        var income = {
            header: 'Income', totalvalue: _.sumBy(incomearray, 'total'),
            values: incomearray
        }
        var operatingexpense = {
            header: 'Operating expense', totalvalue: _.sumBy(operatingexpensearray, 'total'),
            values: operatingexpensearray
        }
        var Costofgoods = {
            header: 'Cost of  goods sold', totalvalue: _.sumBy(Costofgoodsarray, 'total'),
            values: Costofgoodsarray
        }
        finalResponse.push(income, operatingexpense, Costofgoods);
       
        var grossprofit = (income.totalvalue - Costofgoods.totalvalue);
        var grossprofitpercentage=Math.round((grossprofit/income.totalvalue) * 100 ) + '%'
        var netprofit = (grossprofit - operatingexpense.totalvalue)
        var netprofitpercentage=Math.round((netprofit/income.totalvalue) * 100) + '%'
        res.json({ status: 1, message: 'Profit and loss report list', netprofitpercentage,grossprofitpercentage, grossprofit, netprofit, finalResponse })



    },

    getAllApprovedConsignments: (req, res) => {
        let shipper_query = "SELECT * FROM shipping where user_id = ?;"
        let query = "SELECT * FROM consignment where is_approved = 1 and shipper_code = ?;"

        connection.query(shipper_query, req.params.id, (err, results) => {
            if (err) {
                console.log(err);

            } else {
                connection.query(query, results[0].shipper_code, (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            status: false,
                            message: 'there are some error with query'
                        })
                    } else if (rows.length == 0) {
                        res.json({
                            status: false,
                            message: "No results found"
                        });
                    } else {
                        // this.uploadconsignments();
                        res.json({
                            status: true,
                            data: rows
                        })
                    }

                })
            }

        })
    }
}


