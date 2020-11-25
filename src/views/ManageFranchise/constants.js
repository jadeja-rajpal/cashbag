import React from "react";
import View from "assets/img/View";
import Edit from "assets/img/Edit";
import endpoints from "Routes/endpoints";
import { formatDate } from "libs/common";

export const USER_TYPE = {
  CDM: "cdm",
  AGM: "agm",
  BM: "bm",
  AM: "am",
};

export const COMMISSION = {
  [USER_TYPE.AM]: 1,
  [USER_TYPE.AGM]: 3,
  [USER_TYPE.CDM]: 1,
  [USER_TYPE.BM]: 1,
};

export const USER_TYPE_OPTIONS = [
  { name: "CDM", value: USER_TYPE.CDM },
  { name: "AGM", value: USER_TYPE.AGM },
  { name: "BM", value: USER_TYPE.BM },
  { name: "AM", value: USER_TYPE.AM },
];

export const CDM_LISTING_CONSTANTS = (handlers) => [
  {
    title: "S. No.",
    render: (value, row) => {
      return row + 1;
    },
  },
  {
    title: "Name",
    dataIndex: "User.firstName",
    render: (value, row, col, disabled, item) => {
      return `${value} ${item["User.lastName"]}`;
    },
  },
  { title: "Contact No.", dataIndex: "User.mobile" },
  { title: "Email", dataIndex: "User.email" },
  {
    title: "Date of joining",
    dataIndex: "createdAt",
    render: (value) => `${formatDate(value)}`,
  },
  {
    title: "Associated AGM",
    dataIndex: "associatedFranchise.User.firstName",
    render: (value, row, col, disabled, item) =>
      `${value} ${item && item["associatedFranchise.User.lastName"]}`,
  },
  {
    title: "",
    dataIndex: "id",
    render: function actionComponent(value) {
      return (
        <React.Fragment>
          <View
            title="View"
            onClick={() =>
              handlers.redirect(endpoints.viewFranchise(value), "cdm")
            }
          />
          <Edit
            title="Edit"
            onClick={() =>
              handlers.redirect(endpoints.editFranchise(value), "cdm")
            }
          />
        </React.Fragment>
      );
    },
  },
];

export const AGM_LISTING_CONSTANTS = (handlers) => [
  {
    title: "S. No.",
    render: (value, row) => {
      return row + 1;
    },
  },
  {
    title: "Name",
    dataIndex: "User.firstName",
    render: (value, row, col, disabled, item) => {
      return `${value} ${item["User.lastName"]}`;
    },
  },
  { title: "Contact No.", dataIndex: "User.mobile" },
  { title: "Email", dataIndex: "User.email" },
  {
    title: "Date of joining",
    dataIndex: "createdAt",
    render: (value) => `${formatDate(value)}`,
  },
  {
    title: "",
    dataIndex: "id",
    render: function actionComponent(value) {
      return (
        <React.Fragment>
          <View
            title="View"
            onClick={() =>
              handlers.redirect(endpoints.viewFranchise(value), "agm")
            }
          />
          <Edit
            title="Edit"
            onClick={() =>
              handlers.redirect(endpoints.editFranchise(value), "agm")
            }
          />
        </React.Fragment>
      );
    },
  },
];

export const AM_LISTING_CONSTANTS = (handlers) => [
  {
    title: "S. No.",
    render: (value, row) => {
      return row + 1;
    },
  },
  {
    title: "Name",
    dataIndex: "User.firstName",
    render: (value, row, col, disabled, item) => {
      return `${value} ${item["User.lastName"]}`;
    },
  },
  { title: "Contact No.", dataIndex: "User.mobile" },
  { title: "Email", dataIndex: "User.email" },
  {
    title: "Date of joining",
    dataIndex: "createdAt",
    render: (value) => `${formatDate(value)}`,
  },
  {
    title: "Associated CDM",
    dataIndex: "associatedFranchise.User.firstName",
    render: (value, row, col, disabled, item) =>
      `${value} ${item && item["associatedFranchise.User.lastName"]}`,
  },
  {
    title: "",
    dataIndex: "id",
    render: function actionComponent(value) {
      return (
        <React.Fragment>
          <View
            title="View"
            onClick={() =>
              handlers.redirect(endpoints.viewFranchise(value), "am")
            }
          />
          <Edit
            title="Edit"
            onClick={() =>
              handlers.redirect(endpoints.editFranchise(value), "am")
            }
          />
        </React.Fragment>
      );
    },
  },
];

export const BM_LISTING_CONSTANTS = (handlers) => [
  {
    title: "S. No.",
    render: (value, row) => {
      return row + 1;
    },
  },
  {
    title: "Name",
    dataIndex: "User.firstName",
    render: (value, row, col, disabled, item) => {
      return `${value} ${item["User.lastName"]}`;
    },
  },
  { title: "Contact No.", dataIndex: "User.mobile" },
  { title: "Email", dataIndex: "User.email" },
  {
    title: "Date of joining",
    dataIndex: "createdAt",
    render: (value) => `${formatDate(value)}`,
  },
  {
    title: "Associated AM",
    dataIndex: "associatedFranchise.User.firstName",
    render: (value, row, col, disabled, item) =>
      `${value} ${item && item["associatedFranchise.User.lastName"]}`,
  },
  {
    title: "",
    dataIndex: "id",
    render: function actionComponent(value) {
      return (
        <React.Fragment>
          <View
            title="View"
            onClick={() =>
              handlers.redirect(endpoints.viewFranchise(value), "bm")
            }
          />
          <Edit
            title="Edit"
            onClick={() =>
              handlers.redirect(endpoints.editFranchise(value), "bm")
            }
          />
        </React.Fragment>
      );
    },
  },
];

export const franchiseOptionList = (data) => {
  const optionList = [];
  if (data) {
    data.map((option) => {
      optionList.push({
        name: `${option["User.firstName"]} ${option["User.lastName"]}`,
        value: option.id,
      });
      return null;
    });
  }
  return optionList;
};

export const FRANCHISE_TABS = {
  agm: 0,
  cdm: 1,
  am: 2,
  bm: 3,
};
