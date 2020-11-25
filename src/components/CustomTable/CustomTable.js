import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import "./CustomTable.scss";
import Typography from "@material-ui/core/Typography";

class CustomTable extends Component {
  renderHeader() {
    return (
      <TableRow>
        {this.props.columns.map((item, id) => {
          return (
            item && (
              <TableCell
                key={id}
                className={`${item.isHeaderClicked && "pointer"} ${
                  item.isPrint ? "print" : ""
                } ${item.cellWidth ? item.cellWidth : ""}`}
                onClick={
                  item.isHeaderClicked
                    ? () => this.props.getHeader(item)
                    : () => {}
                }
              >
                <span className="table-header-bold">
                  {" "}
                  {item.titleRender ? item.titleRender() : item.title}
                </span>
                {item.isHeaderClicked && (
                  <span className="table-sort-icon-wrapper">
                    <img
                      src={item.icon}
                      className="table-sort-icon"
                      alt={"sort"}
                    />
                  </span>
                )}
              </TableCell>
            )
          );
        })}
      </TableRow>
    );
  }

  renderBody() {
    return (
      this.props.data &&
      this.props.data.map((item, index) => {
        return (
          <tr
            key={item._id ? item._id : index}
            className={`${item.cellWidth ? item.cellWidth : ""}`}
            onClick={(e) =>
              this.props.rowSelection ? this.props.rowSelection(index, e) : {}
            }
          >
            {this.renderColumnData(item, index)}
          </tr>
        );
      })
    );
  }

  renderColumnData(data, index) {
    return this.props.columns.map((item, id) => {
      if (item && item.render) {
        if (
          this.props.editableRow &&
          this.props.editableRow.indexOf(index) > -1
        ) {
          return (
            <td
              className={`${item.style ? item.style : "enabled-input-field"} ${
                item.isPrint && "print"
              } ${item.cellWidth ? item.cellWidth : ""}`}
              key={id}
            >
              {item.render(
                data[item.dataIndex],
                index,
                item.dataIndex,
                false,
                data
              )}
            </td>
          );
        }

        return (
          <td
            className={`${item.style ? item.style : "disabled-input-field"} ${
              item.isPrint && "print"
            }`}
            key={id}
          >
            {item.render(
              data[item.dataIndex],
              index,
              item.dataIndex,
              true,
              data
            )}
          </td>
        );
      }
      return (
        item && (
          <td
            className={`${item.style} ${item.isPrint && "print"} ${
              item.cellWidth ? item.cellWidth : ""
            }`}
            key={id}
          >
            <div>{item.dataIndex ? data[item.dataIndex] : item.dataIndex}</div>
          </td>
        )
      );
    });
  }

  renderTable() {
    return (
      <>
        <TableContainer component={Paper} className="customTable">
          <Table stickyHeader size="small">
            {this.props.showHeader ? (
              <TableHead>{this.renderHeader()}</TableHead>
            ) : null}
            <TableBody>
              {this.props.renderAddRow ? this.renderAddRow() : null}
              {this.props.headerColumns ? this.renderHeaderColumns() : null}
              {this.renderBody()}
              {this.props.footerColumns ? this.renderFooterColumns() : null}
            </TableBody>
          </Table>
          {this.props.totalPage && this.props.totalPage > 1 ? (
            <Box
              display="flex"
              justifyContent={
                this.props.totalCount ? "space-between" : "flex-end"
              }
              alignItems={"center"}
              pt={1}
              pb={1}
            >
              {this.props.totalCount && (
                <Typography className={"total-count"}>
                  Total: {this.props.totalCount}
                </Typography>
              )}
              <Pagination
                size={"small"}
                count={this.props.totalPage}
                defaultPage={1}
                page={this.props.currentPage}
                onChange={this.props.pageChange}
              />
            </Box>
          ) : null}
        </TableContainer>
        {this.props.data && this.props.data.length ? null : (
          <span className="no-data-found table-no-table">
            {this.props.noDataMsg ? this.props.noDataMsg : "No data available"}
          </span>
        )}
      </>
    );
  }

  renderAddRow() {
    return (
      <TableRow>
        {this.props.renderAddRow &&
          this.props.renderAddRow.map((item, index) => {
            if (item.render) {
              return (
                <td key={index}>
                  {item.render(
                    this.props.addFieldValues &&
                      this.props.addFieldValues[item.dataIndex],
                    index,
                    item.dataIndex,
                    this.props.addFieldValues
                  )}
                </td>
              );
            }
            return (
              <td key={index}>
                {this.props.addFieldValues &&
                  this.props.addFieldValues[item.dataIndex]}
              </td>
            );
          })}
      </TableRow>
    );
  }

  renderHeaderColumns() {
    return (
      <TableRow>
        {this.props.headerColumns.map((item, index) => {
          if (item.render) {
            return <td key={index}>{item.render(item.value, index)}</td>;
          }
          return <td key={index}>{item.value}</td>;
        })}
      </TableRow>
    );
  }

  renderFooterColumns() {
    return (
      <TableRow>
        {this.props.footerColumns.map((item, index) => {
          if (item.render) {
            return <td key={index}>{item.render(item.value, index)}</td>;
          }
          return <td key={index}>{item.value}</td>;
        })}
      </TableRow>
    );
  }

  render() {
    return <div className="CustomTable">{this.renderTable()}</div>;
  }
}

CustomTable.propTypes = {
  footerColumns: PropTypes.array,
  headerColumns: PropTypes.array,
  addFieldValues: PropTypes.object,
  renderAddRow: PropTypes.array,
  showHeader: PropTypes.bool,
  noDataMsg: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  getHeader: PropTypes.func,
  editableRow: PropTypes.array,
  rowSelection: PropTypes.func,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  pageChange: PropTypes.func,
  totalCount: PropTypes.number,
};

export default CustomTable;
