const request = require("supertest");
const app = require("../src/app");

describe("test case to validate the starting and ending month amounts", () => {
  test("It should return startmonth amount to be 10000 and endmonth amount to be 10000", async () => {
    const response = await request(app)
        .post("/calculations/rentSchedule")
        .send({
            "leaseStart":"2021-04-01",
            "leaseEnd": "2021-06-01",
            "monthlyRentAmount": 10000
        });
    expect(JSON.parse(response.text)).toStrictEqual([{"periodStart":"04/01/2021","periodEnd":"05/01/2021","amount":10000},{"periodStart":"05/01/2021","periodEnd":"06/01/2021","amount":10000}]);
  });
  test("It should return startmonth amount to be 7000 and endmonth amount to be 4516", async () => {
    const response = await request(app)
        .post("/calculations/rentSchedule")
        .send({
            "leaseStart":"2021-04-10",
            "leaseEnd": "2022-03-15",
            "monthlyRentAmount": 10000
        });
    expect(JSON.parse(response.text)).toStrictEqual(
    [
        {
            "periodStart": "04/10/2021",
            "periodEnd": "05/01/2021",
            "amount": 7000
        },
        {
            "periodStart": "05/01/2021",
            "periodEnd": "06/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "06/01/2021",
            "periodEnd": "07/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "07/01/2021",
            "periodEnd": "08/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "08/01/2021",
            "periodEnd": "09/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "09/01/2021",
            "periodEnd": "10/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "10/01/2021",
            "periodEnd": "11/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "11/01/2021",
            "periodEnd": "12/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "12/01/2021",
            "periodEnd": "01/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "01/01/2022",
            "periodEnd": "02/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "02/01/2022",
            "periodEnd": "03/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "03/01/2022",
            "periodEnd": "03/15/2022",
            "amount": 4516
        }
    ]);
  });
});

describe("test case to validate the number of payments", () => {
  test("It should return an array of length 2", async () => {
    const response = await request(app)
        .post("/calculations/rentSchedule")
        .send({
            "leaseStart":"2021-04-01",
            "leaseEnd": "2021-06-01",
            "monthlyRentAmount": 10000
        });
    expect(JSON.parse(response.text).length).toStrictEqual(2);
  });
  test("It should return array of length 12", async () => {
    const response = await request(app)
        .post("/calculations/rentSchedule")
        .send({
            "leaseStart":"2021-04-10",
            "leaseEnd": "2022-03-15",
            "monthlyRentAmount": 10000
        });
    expect(JSON.parse(response.text).length).toStrictEqual(12);
  });
});

describe("test case to Validate the creation of the rent schedule pay periods and amounts", () => {
  test("It should return a predefined response", async () => {
    const response = await request(app)
        .post("/calculations/rentSchedule")
        .send({
            "leaseStart":"2020-04-15",
            "leaseEnd": "2022-12-31",
            "monthlyRentAmount": 10000
        });
    const expectedResponse = [{
            "periodStart": "04/15/2020",
            "periodEnd": "05/01/2020",
            "amount": 5333
        },
        {
            "periodStart": "05/01/2020",
            "periodEnd": "06/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "06/01/2020",
            "periodEnd": "07/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "07/01/2020",
            "periodEnd": "08/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "08/01/2020",
            "periodEnd": "09/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "09/01/2020",
            "periodEnd": "10/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "10/01/2020",
            "periodEnd": "11/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "11/01/2020",
            "periodEnd": "12/01/2020",
            "amount": 10000
        },
        {
            "periodStart": "12/01/2020",
            "periodEnd": "01/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "01/01/2021",
            "periodEnd": "02/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "02/01/2021",
            "periodEnd": "03/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "03/01/2021",
            "periodEnd": "04/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "04/01/2021",
            "periodEnd": "05/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "05/01/2021",
            "periodEnd": "06/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "06/01/2021",
            "periodEnd": "07/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "07/01/2021",
            "periodEnd": "08/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "08/01/2021",
            "periodEnd": "09/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "09/01/2021",
            "periodEnd": "10/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "10/01/2021",
            "periodEnd": "11/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "11/01/2021",
            "periodEnd": "12/01/2021",
            "amount": 10000
        },
        {
            "periodStart": "12/01/2021",
            "periodEnd": "01/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "01/01/2022",
            "periodEnd": "02/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "02/01/2022",
            "periodEnd": "03/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "03/01/2022",
            "periodEnd": "04/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "04/01/2022",
            "periodEnd": "05/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "05/01/2022",
            "periodEnd": "06/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "06/01/2022",
            "periodEnd": "07/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "07/01/2022",
            "periodEnd": "08/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "08/01/2022",
            "periodEnd": "09/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "09/01/2022",
            "periodEnd": "10/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "10/01/2022",
            "periodEnd": "11/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "11/01/2022",
            "periodEnd": "12/01/2022",
            "amount": 10000
        },
        {
            "periodStart": "12/01/2022",
            "periodEnd": "12/31/2022",
            "amount": 9677
        }];
    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse);
  });
});