import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "components/Loader";
import { getFranchise, clearGetFranchise } from "redux/actions/manageFranchise";
import PropTypes from "prop-types";
import CustomTable from "components/CustomTable";
import { PAGE_SIZE } from "libs/constants";
import { BM_LISTING_CONSTANTS } from "./constants";

function BMListing(props) {
  const { getFranchiseState, redirect } = props;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    props.getFranchise({ userRole: "bm", page: currentPage });
    return () => {
      props.clearGetFranchise();
    };
  }, []);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
    props.getFranchise({ userRole: "bm", page });
  };

  const getTotalPages = (count) => {
    if (!count) {
      return null;
    }
    if (count % PAGE_SIZE === 0) {
      return Math.floor(parseInt(count, 10) / PAGE_SIZE);
    }
    return Math.floor(parseInt(count, 10) / PAGE_SIZE) + 1;
  };

  return (
    <React.Fragment>
      <Loader loader={getFranchiseState.isFetching} />
      <CustomTable
        columns={BM_LISTING_CONSTANTS({ redirect })}
        showHeader={true}
        data={getFranchiseState.data && getFranchiseState.data.rows}
        totalCount={getFranchiseState.data && getFranchiseState.data.count}
        totalPage={getTotalPages(
          getFranchiseState.data && getFranchiseState.data.count
        )}
        pageChange={handlePageChange}
        currentPage={currentPage}
      />
    </React.Fragment>
  );
}

BMListing.propTypes = {
  getFranchise: PropTypes.func,
  getFranchiseState: PropTypes.object,
  clearGetFranchise: PropTypes.func,
  redirect: PropTypes.func,
};

const mapStateToProps = ({ manageFranchise }) => ({
  getFranchiseState: manageFranchise.getFranchiseState,
});

export default connect(mapStateToProps, { getFranchise, clearGetFranchise })(
  BMListing
);
