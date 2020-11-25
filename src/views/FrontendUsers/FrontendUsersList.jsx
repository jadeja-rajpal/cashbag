import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Box } from "@material-ui/core";
import Filter from "components/Filter";
import { DATE_RANGE_ERROR } from "libs/masterConstant";
import Table from "../../components/CustomTable";
import ToolBar from "../../components/Toolbar";
import {
  NO_USER,
  setTableData,
  EXPORT_DATA,
  TICKET_FILTER,
  EXPORT_HEADER,
  XLS_FILE_NAME,
  SEARCH_KEY_LIST,
  FRONT_END_USER_CONSTANTS,
} from "./constant";
import {
  getUsersListAction,
  getAllStatesCitiesAction,
  clearAllStatesCitiesAction,
  clearUsersListAction,
} from "../../redux/actions/frontendUserActions";
import Loader from "../../components/Loader";
import endpoints from "../../Routes/endpoints";
import displayNotifications from "../../libs/notification";
import { removeEmptyObject, apiDateFormat } from "../../api/helperFunction";
import BreadCrumb from "../../components/Breadcrumb";

const size = 10;

function FrontendUsers(props) {
  const [addressMapping, setaddressMapping] = useState({
    gotAddress: false,
    gotList: false,
  });
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchKey, setSearchKey] = useState("name");
  const [filterPayload, setFilterPayload] = useState({
    show: false,
    status: "",
    savedStatus: "",
    city: "",
    savedCity: "",
    state: "",
    savedState: "",
    startDate: "",
    savedStartDate: "",
    endDate: "",
    savedEndDate: "",
  });

  useEffect(() => {
    props.getAllStatesCitiesAction();
    props.getUsersListAction({ size, page: 1 });
  }, []);

  useEffect(() => {
    return () => {
      props.clearUsersListAction();
      props.clearAllStatesCitiesAction();
    };
  }, []);

  useEffect(() => {
    if (props.usersListReducer.isError) {
      displayNotifications(props.usersListReducer.apiMsg, "error");
    } else if (props.usersListReducer.isSuccess) {
      setaddressMapping({
        ...addressMapping,
        gotList: true,
      });
    }
  }, [props.usersListReducer]);

  useEffect(() => {
    if (props.statesCitiesReducer.isError) {
      displayNotifications(props.statesCitiesReducer.apiMsg, "error");
    } else if (props.statesCitiesReducer.isSuccess) {
      setaddressMapping({
        ...addressMapping,
        gotAddress: true,
      });
    }
  }, [props.statesCitiesReducer]);

  useEffect(() => {
    if (addressMapping.gotAddress && addressMapping.gotList) {
      setDataList(() => {
        const data = setTableData(
          props.usersListReducer.data,
          props.statesCitiesReducer.data.city,
          props.statesCitiesReducer.data.state
        );
        return data || [];
      });
    }
  }, [addressMapping]);

  const handleEdit = () => {
    props.history.push(endpoints.frontendUserDetails);
  };

  const onSearchClick = () => {
    setPage(1);
    props.getUsersListAction(
      removeEmptyObject({
        size,
        page: 1,
        [searchKey]: searchValue,
        cityId: filterPayload.city,
        stateId: filterPayload.state,
        status: filterPayload.status,
        joinstart: apiDateFormat(filterPayload.startDate),
        joinend: apiDateFormat(filterPayload.endDate),
      })
    );
  };

  const onSearchKeyChange = (value) => {
    setSearchKey(value);
  };

  const handleToolbarFilterClick = () => {
    setFilterPayload({
      ...filterPayload,
      show: true,
      status: filterPayload.savedStatus,
      city: filterPayload.savedCity,
      state: filterPayload.savedState,
      startDate: filterPayload.savedStartDate,
      endDate: filterPayload.savedEndDate,
    });
  };

  const handleResetFilter = () => {
    setFilterPayload({
      ...filterPayload,
      status: "",
      state: "",
      city: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleFilterDateChange = (e, type) => {
    if (type === "start") {
      setFilterPayload({
        ...filterPayload,
        startDate: e.target.value,
      });
    } else if (type === "end") {
      setFilterPayload({
        ...filterPayload,
        endDate: e.target.value,
      });
    }
  };

  const handleCloseFilter = () => {
    setFilterPayload({
      ...filterPayload,
      show: false,
    });
  };

  const handleFilterStatusChange = (e) => {
    setFilterPayload({
      ...filterPayload,
      status: e.target.value,
    });
  };

  const handleFilterCityChange = (e) => {
    setFilterPayload({
      ...filterPayload,
      city: e.target.value,
    });
  };

  const handleFilterStateChange = (e) => {
    setFilterPayload({
      ...filterPayload,
      state: e.target.value,
    });
  };

  const handleApplyFilter = () => {
    setFilterPayload({
      ...filterPayload,
      savedStatus: filterPayload.status,
      savedCity: filterPayload.city,
      savedState: filterPayload.state,
      savedStartDate: filterPayload.startDate,
      savedEndDate: filterPayload.endDate,
      show: false,
    });

    if (
      (filterPayload.startDate && !filterPayload.endDate) ||
      (!filterPayload.startDate && filterPayload.endDate)
    ) {
      displayNotifications(DATE_RANGE_ERROR, "error");
      return false;
    }
    setPage(1);
    props.getUsersListAction(
      removeEmptyObject({
        size,
        page: 1,
        [searchKey]: searchValue,
        cityId: filterPayload.city,
        stateId: filterPayload.state,
        status: filterPayload.status,
        joinstart: apiDateFormat(filterPayload.startDate),
        joinend: apiDateFormat(filterPayload.endDate),
      })
    );
    return true;
  };

  const onPageChange = (_e, value) => {
    setPage(value);
    props.getUsersListAction(
      removeEmptyObject({
        size,
        page: value,
        [searchKey]: searchValue,
        cityId: filterPayload.city,
        stateId: filterPayload.state,
        status: filterPayload.status,
        joinstart: apiDateFormat(filterPayload.startDate),
        joinend: apiDateFormat(filterPayload.endDate),
      })
    );
  };

  return (
    <>
      <BreadCrumb />
      <Loader loader={props.usersListReducer.isFetching} />
      <Box mb={1}>
        <ToolBar
          showSearch={true}
          searchValue={searchValue}
          onSearchClick={() => onSearchClick()}
          onSearchChange={(e) => setSearchValue(e.target.value)}
          showSearchDropdown={true}
          showFilter={true}
          onClickFilter={handleToolbarFilterClick}
          filterApplied={Boolean(
            filterPayload.savedStatus ||
              filterPayload.savedCity ||
              filterPayload.savedState ||
              (filterPayload.savedStartDate && filterPayload.savedEndDate)
          )}
          keyList={SEARCH_KEY_LIST}
          keyValue={searchKey}
          onKeyChange={(e) => onSearchKeyChange(e.target.value)}
          showPrint={true}
          showExport={true}
          xlsData={EXPORT_DATA({
            data: dataList || [],
            dataIndex: ["name", "mobile", "email", "city", "state", "joinOn"],
          })}
          xlsHeaders={EXPORT_HEADER({
            data: FRONT_END_USER_CONSTANTS(),
          })}
          xlsFileName={XLS_FILE_NAME}
        />
      </Box>
      {filterPayload.show && (
        <Filter
          closeFilter={handleCloseFilter}
          columns={TICKET_FILTER(
            {
              handleFilterStatusChange,
              handleFilterCityChange,
              handleFilterStateChange,
              handleFilterDateChange,
            },
            {
              statusValue: filterPayload.status,
              cityValue: filterPayload.city,
              stateValue: filterPayload.state,
              startDate: filterPayload.startDate,
              endDate: filterPayload.endDate,
            },
            {
              cities: props.statesCitiesReducer.data.city || {},
              states: props.statesCitiesReducer.data.state || {},
            }
          )}
          resetFilter={handleResetFilter}
          applyFilter={handleApplyFilter}
        />
      )}
      <Table
        showHeader={true}
        columns={FRONT_END_USER_CONSTANTS({
          handleEdit,
        })}
        data={dataList || []}
        noDataMsg={NO_USER}
        currentPage={page}
        pageChange={onPageChange}
        totalPage={props.usersListReducer.totalPages}
        totalCount={props.usersListReducer.totalItems}
      />
    </>
  );
}

FrontendUsers.propTypes = {
  onClickBtn: PropTypes.func,
  history: PropTypes.object,
  usersListReducer: PropTypes.object,
  statesCitiesReducer: PropTypes.object,
  statesListReducer: PropTypes.object,
  getUsersListAction: PropTypes.func,
  getAllStatesCitiesAction: PropTypes.func,
  getAllStatesAction: PropTypes.func,
  clearAllStatesCitiesAction: PropTypes.func,
  clearAllStatesAction: PropTypes.func,
  clearUsersListAction: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    usersListReducer: state.frontendUsersReducer.usersListState,
    statesCitiesReducer: state.frontendUsersReducer.statesCitiesListState,
  };
}

export default connect(mapStateToProps, {
  getUsersListAction,
  getAllStatesCitiesAction,
  clearAllStatesCitiesAction,
  clearUsersListAction,
})(FrontendUsers);
