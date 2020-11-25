import React from "react";
import { Edit, View, Team, Card, Delete } from "assets/img";
import { formatDate } from "../../libs/common";

export const FRONT_END_USER_CONSTANTS = (handler) => [
  {
    title: "S. No",
    dataIndex: "sno",
    isPrint: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    isPrint: true,
    isExport: true,
  },
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    isPrint: true,
    isExport: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    isPrint: true,
    isExport: true,
  },
  {
    title: "Pincode",
    dataIndex: "pincode",
  },
  {
    title: "City",
    dataIndex: "city",
    isPrint: true,
    isExport: true,
  },
  {
    title: "State",
    dataIndex: "state",
    isPrint: true,
    isExport: true,
  },
  {
    title: "Join On",
    dataIndex: "joinOn",
    isExport: true,
  },
  {
    title: "Status",
    dataIndex: "isActive",
    isPrint: true,
    render: function renderStatus(value) {
      return value ? <span>Active</span> : <span>Blocked</span>;
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: function renderActions() {
      return (
        <>
          <span>
            <View onClick={handler.handleEdit} />
          </span>
          <span>
            <Edit />
          </span>
          <span>
            <Team />
          </span>
          <span>
            <Card />
          </span>
          <span>
            <Delete />
          </span>
        </>
      );
    },
  },
];

export const setTableData = (list, allCities, allStates) => {
  let listData = [];
  listData =
    list.length &&
    list.map((item, index) => {
      return {
        sno: index + 1,
        id: item.id,
        name: `${item.firstName || ""} ${item.listName || ""}`,
        email: item.email,
        mobile: item.mobile,
        isActive: item.isActive,
        pincode: item.pincode,
        state: allStates[item.stateId],
        city: allCities[item.cityId],
        joinOn: formatDate(item.createdAt),
      };
    });

  return listData || [];
};

export const USER_PROFILE_DUMMY_DATA = {
  userInfo: [
    { title: "Team", value: "161" },
    { title: "Sponsor", value: "CashBag" },
    { title: "Mobile", value: "9988998877" },
    { title: "Invite Code", value: "RAJ1234" },
  ],
  kycInfo: [
    { title: "Pan", value: "Pending" },
    { title: "Id Proof", value: "Pending" },
    { title: "Bank", value: "Not Verified" },
  ],
  cardInfo: [{ title: "Bank", value: "Card not Issued" }],
};

export const SEARCH_KEY_LIST = [
  { name: "Id", value: "id" },
  { name: "Name", value: "name" },
  { name: "Email", value: "email" },
  { name: "Mobile", value: "mobile" },
  { name: "Pincode", value: "pincode" },
];

const exportRow = (item, dataIndex) => {
  const rowData = dataIndex.map((element) => item[element]);
  return rowData;
};

export const EXPORT_DATA = (handler) =>
  handler.data &&
  handler.data.map((item) => exportRow(item, handler.dataIndex));

export const EXPORT_HEADER = (handler) => {
  const headerArray = [];
  if (handler.data) {
    handler.data.forEach(
      (item) => item.isExport && headerArray.push(item.title)
    );
  }
  return headerArray;
};

export const TICKET_FILTER = (handlers, data, { states, cities }) => {
  const state =
    Object.keys(states).map((key) => {
      return {
        value: key,
        name: states[key],
      };
    }) || {};

  const city =
    Object.keys(cities).map((key) => {
      return {
        value: key,
        name: cities[key],
      };
    }) || {};

  return [
    {
      type: "Dropdown",
      label: "Status",
      options: [
        { name: "Active", value: "true" },
        { name: "Blocked", value: "false" },
      ],
      onChangeDropDown: handlers.handleFilterStatusChange,
      selectedDropDown: data.statusValue,
    },
    {
      type: "Dropdown",
      label: "State",
      options: [...state],
      onChangeDropDown: handlers.handleFilterStateChange,
      selectedDropDown: data.stateValue,
    },
    {
      type: "Dropdown",
      label: "City",
      options: [...city],
      onChangeDropDown: handlers.handleFilterCityChange,
      selectedDropDown: data.cityValue,
    },
    {
      type: "DateRange",
      startDateChange: (e) => handlers.handleFilterDateChange(e, "start"),
      startDateValue: data.startDate,
      startDateLabel: "Date From",
      endDateChange: (e) => handlers.handleFilterDateChange(e, "end"),
      endDateValue: data.endDate,
      endDateLabel: "Date To",
    },
  ];
};

export const NO_USER = "No user available";

export const XLS_FILE_NAME = "Frontend_Users.xlsx";
