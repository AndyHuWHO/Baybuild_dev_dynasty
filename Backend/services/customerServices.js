const Customer = require("../models/Customer");
const { addLogToDb } = require("./logServices");

const getCustomersFromDb = async ({ customerNameQuery }) => {
  const filter = customerNameQuery
    ? {
        customer_name: { $regex: customerNameQuery, $options: "i" },
      }
    : {};

  return await Customer.find(filter).sort({ customer_name: 1 });
};

const addCustomerToDb = async (customerData) => {
  const customer = new Customer(customerData);
  await customer.save();
  const logParams = { customerName: customerData.customer_name };
  await addLogToDb("New customer", logParams);
  return customer;
};

const deleteCustomerFromDb = async (customerId) => {
  const customer = await Customer.findByIdAndDelete(customerId);
  if (customer) {
    return { success: true };
  } else {
    return { success: false };
  }
};

const getCustomerFromDb = async (customerId) => Customer.findById(customerId);

const updateCustomerInDb = async (customerId, customerData) => {
  const { customer_name, customer_email } = customerData;
  return Customer.findByIdAndUpdate(
    customerId,
    {
      $set: {
        customer_name: customer_name,
        customer_email: customer_email,
      },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  getCustomersFromDb,
  addCustomerToDb,
  deleteCustomerFromDb,
  getCustomerFromDb,
  updateCustomerInDb,
};
