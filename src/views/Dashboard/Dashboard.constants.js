const earnings = (data) => [
  {
    title: data.AGM,
    data: "400",
    name: data.AGM_FULL,
    color: "warning",
  },
  {
    title: data.CDM,
    data: "20056",
    name: data.CDM_FULL,
    color: "danger",
  },
  {
    title: data.AM,
    data: "2440098",
    name: data.AM_FULL,
    color: "success",
  },
  {
    title: data.BM,
    data: "20021212",
    name: data.BM_FULL,
    color: "info",
  },
];

export default earnings;
