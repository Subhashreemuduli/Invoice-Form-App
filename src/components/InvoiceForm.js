import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PdfUploader from "./PdfUploader";
import { useNavigate } from "react-router-dom";
import BusinessSharpIcon from "@mui/icons-material/BusinessSharp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChatIcon from "@mui/icons-material/Chat";

const STORAGE_KEY = "invoiceFormData";

const InvoiceForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [storedValues, setStoredValues] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setStoredValues(JSON.parse(savedData));
    }
  }, []);

  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    setPdfFile(file);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("pdfFile");
    localStorage.removeItem(STORAGE_KEY);
    navigate("/");
  };

  const validationSchema = Yup.object({
    poNumber: Yup.string().required("Purchase Order Number is required"),
    vendor: Yup.string().required("Vendor is required"),
    invoiceDate: Yup.date().required("Invoice Date is required"),
    totalAmount: Yup.number()
      .required("Total Amount is required")
      .positive("Must be a positive number"),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    dueDate: Yup.date().required("Due Date is required"),
    glPostDate: Yup.date().required("GL Post Date is required"),
    invoiceDescription: Yup.string().required(
      "Invoice Description is required"
    ),
    description: Yup.string().required("Description is required"),
    expenseAmount: Yup.number()
      .required("Expense Amount is required")
      .positive("Must be a positive number"),
    department: Yup.string().required("Department is required"),
    invoiceNumber: Yup.string().required("Purchase Order Number is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
  });

  const autofillValues = {
    poNumber: "123456",
    vendor: "A - 1 Exterminators",
    invoiceDate: "2024-02-01",
    totalAmount: "1500",
    paymentTerms: "Net 30",
    dueDate: "2024-03-01",
    glPostDate: "2024-02-05",
    invoiceDescription: "Monthly pest control service",
    description: "Office pest control services",
    expenseAmount: "1500",
    department: "Finance",
    invoiceNumber: "INV-2024-001",
    account: "12345",
    location: "Head Office",
  };

  const initialValues = storedValues || {
    poNumber: "",
    vendor: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    dueDate: "",
    glPostDate: "",
    invoiceDescription: "",
    description: "",
    expenseAmount: "",
    department: "",
    invoiceNumber: "",
    account: "",
    location: "",
  };

  return (
    <div className="flex bg-gray-100 p-8 w-full">
      <PdfUploader onFileUpload={handleFileUpload} />

      <div className="h-full w-2/3 bg-white p-6 ml-8 rounded-lg shadow-lg">
        <div className="text-xl font-semibold border-b pb-4 mb-4">
          Create New Invoice
          <button
            className="absolute right-16 border-b bg-red-600 text-white p-2 rounded-xl text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!pdfFile) {
              alert("Please upload a PDF file.");
              setSubmitting(false);
              return;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
            alert("Invoice saved successfully!");
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setValues }) => (
            <Form className="space-y-6">
              <h1 className="font-bold text-xl mb-8">
                <span className="mr-4">
                  <BusinessSharpIcon color="primary" />
                </span>
                Vendor Details
              </h1>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Vendor Information
                </h3>
                <div className="my-2">
                  <label className="block text-gray-600 text-sm">Vendor</label>
                  <Field
                    as="select"
                    name="vendor"
                    className="w-full border rounded p-2 mt-1"
                  >
                    <option value="">Select Vendor</option>
                    <option value="A - 1 Exterminators">
                      A - 1 Exterminators
                    </option>
                  </Field>
                  <ErrorMessage
                    name="vendor"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h1 className="font-bold text-xl my-10">
                  <span className="mr-4">
                    <ReceiptIcon color="primary" />
                  </span>
                  Invoice Details
                </h1>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    General Information
                  </h3>
                  <div className="my-8">
                    <label className="block text-gray-600 text-sm">
                      Purchase Order Number
                    </label>
                    <Field
                      type="number"
                      name="poNumber"
                      className="w-full border rounded p-2 mt-1"
                      placeholder="Select PO Number"
                    />

                    <ErrorMessage
                      name="poNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                Invoice Details
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-gray-600 text-sm">
                    Invoice Number
                  </label>
                  <Field
                    type="text"
                    name="invoiceNumber"
                    className="mt-2 w-full border rounded p-2"
                    placeholder="Enter Invoice Number"
                  />
                  <ErrorMessage
                    name="invoiceNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    Invoice Date
                  </label>
                  <Field
                    type="date"
                    name="invoiceDate"
                    className="mt-2 w-full border rounded p-2"
                  />
                  <ErrorMessage
                    name="invoiceDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    Total Amount
                  </label>
                  <Field
                    type="number"
                    name="totalAmount"
                    className="mt-2 w-full border rounded p-2"
                    placeholder="$ 0.00"
                  />
                  <ErrorMessage
                    name="totalAmount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    Payment Terms
                  </label>

                  <Field
                    as="select"
                    name="paymentTerms"
                    className="mt-2 w-full border rounded p-2"
                  >
                    <option value="">Select Payment Terms</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                  </Field>
                  <ErrorMessage
                    name="paymentTerms"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    Invoice Due Date
                  </label>
                  <Field
                    type="date"
                    name="dueDate"
                    className="mt-2 w-full border rounded p-2"
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    GL Post Date
                  </label>
                  <Field
                    type="date"
                    name="glPostDate"
                    className="mt-2 w-full border rounded p-2"
                  />
                  <ErrorMessage
                    name="glPostDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-600 text-sm">
                    Invoice Description
                  </label>
                  <Field
                    as="textarea"
                    name="invoiceDescription"
                    className="mt-2 w-full border rounded p-2"
                    placeholder="Enter Description"
                  />
                  <ErrorMessage
                    name="invoiceDescription"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Expense Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Line Amount
                    </label>
                    <div className="flex items-center border rounded p-2">
                      <span className="mr-2">$</span>
                      <Field
                        type="number"
                        name="expenseAmount"
                        className="w-full"
                        placeholder="0.00"
                      />
                      <span className="ml-2">USD</span>
                    </div>
                    <ErrorMessage
                      name="expenseAmount"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Department
                    </label>
                    <Field
                      as="select"
                      name="department"
                      className="w-full border rounded p-2"
                    >
                      <option>Select Department</option>
                      <option>Finance</option>
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Account
                    </label>
                    <Field
                      as="select"
                      name="account"
                      className="w-full border rounded p-2"
                    >
                      <option>Select Account</option>
                      <option>12345</option>
                    </Field>
                    <ErrorMessage
                      name="account"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">
                      Location
                    </label>
                    <Field
                      as="select"
                      name="location"
                      className="w-full border rounded p-2"
                    >
                      <option>Select Location</option>
                      <option>Head Office</option>
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-600 text-sm">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="w-full border rounded p-2"
                      placeholder="Enter description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className=" bg-gray-300 px-4 py-2 rounded-lg absolute right-14 mt-2"
                >
                  + Add Expense Coding
                </button>
              </div>

              <div className="my-8">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">
                    <ChatIcon color="primary" />
                  </span>
                  Comments
                </h3>
                <div className="mt-2 flex items-center border rounded-lg bg-white p-2">
                  <Field
                    type="text"
                    name="comment"
                    placeholder="Add a comment and use @Name to tag someone"
                    className="w-full outline-none p-2"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Submit Invoice
              </button>
              <button
                type="button"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                onClick={() => {
                  setValues(autofillValues);
                }}
              >
                Autofill Fields
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InvoiceForm;
