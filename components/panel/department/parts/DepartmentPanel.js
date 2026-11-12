import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";
import SpinnerLoader from "../../SpinnerLoader";
import AppBar from "@mui/material/AppBar";
import "animate.css";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "@mui/material/Slider";

import Grid from "@mui/material/Grid";
import Styles from "../../../styles/department/DepartmentPanel.module.css";
import RealStateSmalCard from "../../../cards/realestate/RealStateSmalCard";
import RealStateInDepartmentCard from "../../../cards/realestate/RealStateInDepartmentCard";
import WorkerCard from "../../../cards/WorkerCard";

import LazyLoader from "../../../lazyLoader/Loading.js";
import dynamic from "next/dynamic";
import WorkerCardSkeleton from "../../../skeleton/WorkerCardSkeleton";

import WorkerFilter from "../../../WorkerFilter.js";

const DepartmentWorkerCard = dynamic(
  () => import("../../../cards/DepartmentWorkerCard"),
  {
    loading: () => <WorkerCardSkeleton />,
  }
);
import QrCodeGenerator from "../../../others/QrCodeGenerator.jsx";
import Share from "../../../marketers/Share";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircleIcon from "@mui/icons-material/Circle";

import SortIcon from "@mui/icons-material/Sort";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SpeedDial from "@mui/material/SpeedDial";
import Add from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SpinnerModalLoader from "../../../panel/SpinnerModalLoader";
import CallIcon from "@mui/icons-material/Call";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { id } from "date-fns/locale";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const sortAgentsFilters = [
  { name: "بیشترین بازدید", english: "more_views" },
  { name: "بیشترین فایل", english: "more_files" },
  { name: "جدیدترین", english: "more_recents" },
];

const DepartmentPanel = (props) => {
  const router = useRouter();
  const user_from = props.user;
  const role = props.role;
  const [loading, set_loading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [modal_kind, set_modal_kind] = React.useState("new_user");
  const [user, set_user] = useState();
  const [department, set_department] = useState();
  const [total_department_workers, set_total_department_workers] = useState([]);
  const [department_workers, set_department_workers] = useState([]);
  const [all_department_workers, set_all_department_workers] = useState([]);
  const [department_colleagues, set_department_colleagues] = useState([]);
  const [subcategories, set_subcategories] = useState([]);
  const [department_waited_colleagues, set_department_waited_colleagues] =
    useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [problem, setProblem] = useState("test");
  const [open_snak, set_open_snak] = useState(false);

  const [key, setKey] = React.useState("files");

  const [value, setValue] = React.useState("files");
  const [sortKey, setSortKey] = React.useState("more_recents");
  const [normal_fields, set_normal_fields] = useState([]);
  const [predefine_fields, set_predefine_fields] = useState([]);
  const [tick_fields, set_tick_fields] = useState([]);

  const [properties, set_properties] = useState([]);
  const [tick_properties, set_tick_properties] = useState([]);
  const [neighborhoods, set_neighborhoods] = useState([]);
  const [y_ofset, set_y_ofset] = useState(0);

  const [neighbor, set_neighbor] = useState();
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  // Add missing state variables
  const [selectedcat, set_selectedcat] = useState(false);
  const [selected_neighborhoods, set_selected_neighborhoods] = useState([]);
  const [selected_neighborhoods_array, set_selected_neighborhoods_array] =
    useState([]);
  const [filter_level, set_filter_level] = useState("base");
  const [filter_selected_category_name, set_filter_selected_category_name] =
    useState();

  useEffect(() => {
    var cookie_key = Cookies.get("cookie_secound_key");
    if (cookie_key) {
      setKey(cookie_key);
    }
  }, []);

  useEffect(() => {
    Cookies.set("cookie_secound_key", key, { expires: 200 });
  }, [key]);

  useEffect(() => {
    setFilteredWorkers(all_department_workers);
  }, [all_department_workers]);

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
    onSortChangeClicked(event.target.value);
    setOpen(false);
  };

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + " هزار ";
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(0) + " میلیون ";
    } else if (num >= 1000000000) {
      return (num / 1000000000).toFixed(0) + "میلیارد";
    } else if (num < 900) {
      return num;
    }
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  function onSortChangeClicked(event) {
    var orginal_department_workers = department_workers;

    set_loading(true);

    if (event == "more_recents") {
      var sorted_department_workers = orginal_department_workers.sort(
        (a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      set_department_workers([]);
      set_department_workers(sorted_department_workers);

      set_loading(false);
    } else if (event == "more_updated") {
      var sorted_department_workers = orginal_department_workers.sort(
        (a, b) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
      );
      set_department_workers([]);
      set_department_workers(sorted_department_workers);

      set_loading(false);
    } else if (event == "more_viewd") {
      var sorted_department_workers = orginal_department_workers.sort(
        (a, b) => {
          return b.total_view - a.total_view;
        }
      );
      set_department_workers([]);
      set_department_workers(sorted_department_workers);

      set_loading(false);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderNewAgentModal = () => {
    set_modal_kind("new_user");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnak = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    set_open_snak(false);
  };

  const onPopstateFuction = () => {
    history.pushState(null, "", router.asPath);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      history.pushState(null, "/", router.asPath);
      window.addEventListener("popstate", onPopstateFuction);
    }
    return () => {
      window.removeEventListener("popstate", onPopstateFuction);
    };
  }, [open]);

  const renderJoinRequests = () => {
    if (role == "رییس" || role == "مدیر") {
      return (
        department_waited_colleagues.length > 0 && (
          <Tab
            eventKey="jountrequest"
            title={
              <p style={{ fontSize: 15 }}>
                {"درخواست "} {"("} {department_waited_colleagues.length} {")"}
              </p>
            }
            className={Styles["personal-tab"]}
          >
            {role == "رییس" ||
              (role == "مدیر" && (
                <div className={Styles["new-wrapper"]}>
                  <Button
                    onClick={renderNewAgentModal}
                    variant="outlined"
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    مشاور جدید
                  </Button>
                </div>
              ))}

            <div>
              <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    {renderDepartmentWaitedColleagues()}
                  </Grid>
                </Box>
              </Grid>
            </div>
          </Tab>
        )
      );
    }
  };

  const goToEditDepartment = () => {
    router.push("/panel/new_department");
  };

  const clickToOpenSortSelection = () => {
    set_modal_kind("sort");
    setOpen(true);
  };

  const handleChangeInput = (e) => {
    console.log("form changed");
    console.log(e.target.value);
  };

  const onClickSearchBox = () => {
    set_modal_kind("search");
    setOpen(true);
  };

  const renderSearchButton = () => {
    if (1) {
      return (
        <Paper className={Styles["search-wrapper"]} elevation={5}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 2px",
              fontFamily: "iransans",
            }}
          >
            <InputBase
              onClick={onClickSearchBox}
              sx={{ ml: 1, flex: 1, direction: "rtl", fontFamily: "iransans" }}
              placeholder="جستجو منطقه ,مشاور، عنوان فایل  و ... "
              inputProps={{ "aria-label": "جستجو منطقه" }}
              onChange={handleChangeInput}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Paper>
      );
    }
  };

  const renderSortButtonTitle = () => {
    if (sortKey == "more_recents") {
      return <div>جدیدترین </div>;
    } else if (sortKey == "more_viewd") {
      return <div>بیشترین بازدید</div>;
    } else if (sortKey == "more_updated") {
      return <div>جدیدترین بروز رسانی</div>;
    } else {
      return <div> مرتب سازی</div>;
    }
  };

  const renderDepartmentWorkersTabContent = () => {
    return (
      <Grid item xs={12}>
            <WorkerFilter
              workers={all_department_workers}
              onFilteredWorkersChange={setFilteredWorkers}
              enableLocalCategoryFilter={true}
              availableCategories={subcategories}
            />
            {renderDepartmentWorkers()}
      </Grid>
    );
  };

  const renderDepartmentAgentsTabContent = () => {
    return (
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {renderDepartmentColleaguesSortButtons()}
            {renderDepartmentColleagues()}
          </Grid>
        </Box>
      </Grid>
    );
  };

  const renderDepartmentAgentsWaitingTabContent = () => {
    return department_waited_colleagues.map((realstate) => (
      <Grid item md={6} xs={12} key={realstate.id}>
        <RealStateInDepartmentCard
          department={department}
          key={realstate.id}
          realstate={realstate}
        />
      </Grid>
    ));
  };

  const renderTabs = () => {
    if (1) {
      return (
        <Tabs
          id="controlled-tab-example"
          fill
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="files"
            title={
              <p style={{ fontSize: 14 }}>
                {"فایل ها"} {"("}
                {total_department_workers}
                {")"}
              </p>
            }
            className={Styles["personal-tab"]}
          >
            <Grid item xs={12}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                  {renderDepartmentWorkersTabContent()}
                </Grid>
              </Box>
            </Grid>
          </Tab>

          <Tab
            eventKey="agents"
            title={
              <p style={{ fontSize: 14 }}>
                {"مشاورین"} {"("} {department_colleagues.length} {")"}
              </p>
            }
            className={Styles["personal-tab"]}
          >
            <div>
              <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    {renderDepartmentAgentsTabContent()}
                  </Grid>
                </Box>
              </Grid>
            </div>
          </Tab>

          {department_waited_colleagues.length > 0 &&
            (role == "رییس" || role == "مدیر") && (
              <Tab
                eventKey="jountrequest"
                title={
                  <p style={{ fontSize: 15 }}>
                    <CircleIcon style={{ color: "red", fontSize: "12px" }} />{" "}
                    {"درخواست "}
                  </p>
                }
                className={Styles["personal-tab"]}
              >
                <div>
                  <Grid item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={1}>
                        {renderDepartmentAgentsWaitingTabContent()}
                      </Grid>
                    </Box>
                  </Grid>
                </div>
              </Tab>
            )}
        </Tabs>
      );
    }
  };

  const renderhowmanydaylisted = (day) => {
    if (day == 0) {
      return "امروز";
    } else {
      return day + " روز پیش ";
    }
  };

  const renderListedByBox = (worker) => {
    var listed_colleague = department_colleagues.filter((x) => {
      return x.id == worker.user_id;
    });

    var cl = listed_colleague[0];

    if (cl) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "1px 5px",
            margin: "0px 8px",
            background: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "10px", padding: "1px 10px" }}>
              <Button
                style={{ marginTop: 5 }}
                variant="outlined"
                href={`tel:${cl && cl.phone}`}
                startIcon={
                  <CallIcon style={{ color: "green", fontSize: "12px" }} />
                }
              >
                تماس
              </Button>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 14,
            }}
          >
            <Link href={`/realestates/${cl.id}?slug=${cl.name}`}>
              <p style={{ marginTop: 12 }}>
                {cl.name} {cl.family} (
                {renderhowmanydaylisted(worker.total_day)} )
              </p>
            </Link>
            <p style={{ marginTop: 12 }}>
              {" "}
              {":"} {" لیست شده توسط "}{" "}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px 15px",
            margin: "5px 6px",
            background: "white",
          }}
        >
          <p>دپارتمان</p>
          <p>لیست شده توسط </p>
        </div>
      );
    }
  };

  const renderDepartmentWorkers = () => {
    return (
      <LazyLoader
        items={filteredWorkers}
        itemsPerPage={8}
        delay={800}
        renderItem={(worker, key) => (
          <Grid item md={4} xs={12} key={worker.id}>
            <DepartmentWorkerCard
              key={worker.id}
              worker={worker}
              priority={key < 4}
            />
            {renderListedByBox(worker)}
          </Grid>
        )}
        loadingComponent={
          <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>
        }
        endComponent={
          <p style={{ textAlign: "center" }}>همه فایل‌ها بارگذاری شدند✅</p>
        }
        grid={true}
        gridProps={{ spacing: 3 }}
      />
    );
  };

  const onclickSortAgent = (filter) => {
    var orginal_department_colleagues = department_colleagues;

    if (filter.english == "more_recents") {
      var sorted_department_colleagues = orginal_department_colleagues
        .sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        })
        .reverse();

      set_department_colleagues(sorted_department_colleagues);
    } else if (filter.english == "more_views") {
      var sorted_department_colleagues = orginal_department_colleagues.sort(
        (a, b) => b.total_view - a.total_view
      );

      set_department_colleagues(sorted_department_colleagues);
    } else if (filter.english == "more_files") {
      var sorted_department_colleagues = orginal_department_colleagues.sort(
        (a, b) => b.worker_amount - a.worker_amount
      );

      set_department_colleagues(sorted_department_colleagues);
    }

    setSortKey(filter.english);
  };

  const renderDepartmentColleaguesSortButtons = () => {
    return sortAgentsFilters.map((filter) =>
      filter.english == sortKey ? (
        <Grid item md={4} xs={4} key={filter.id}>
          <p
            style={{
              borderBottom: "1px solid purple",
              paddingBottom: 3,
              cursor: "pointer",
            }}
          >
            {filter.name}{" "}
          </p>
        </Grid>
      ) : (
        <Grid
          item
          md={4}
          xs={4}
          key={filter.id}
          onClick={() => onclickSortAgent(filter)}
        >
          <p style={{ cursor: "pointer" }}>{filter.name}</p>
        </Grid>
      )
    );
  };

  const renderDepartmentColleagues = () => {
    return department_colleagues.map(
      (realstate) =>
        realstate.status == 1 && (
          <Grid
            item
            md={4}
            xs={12}
            key={realstate.id}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
            className={` animate__animated animate__flipInY    `}
          >
            <RealStateInDepartmentCard
              department={department}
              key={realstate.user_id}
              realstate={realstate}
            />
          </Grid>
        )
    );
  };

  const renderDepartmentWaitedColleagues = () => {
    return department_waited_colleagues.map((realstate) => (
      <Grid item md={6} xs={12} key={realstate.id}>
        <RealStateInDepartmentCard
          department={department}
          key={realstate.id}
          realstate={realstate}
        />
      </Grid>
    ));
  };

  const DepartmentInviteLinkCopyClick = () => {
    console.log("realestateMarketingLinkClick toched");
    copyToClipBoard(
      "https://boomlex.ir/department/" +
        department.id +
        "?invite_from=" +
        user_from.phone
    );
  };

  const copyToClipBoard = async (copyMe) => {
    const permissions = await navigator.permissions.query({
      name: "clipboard-write",
    });
    if (permissions.state === "granted" || permissions.state === "prompt") {
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess("Copied!");
        console.log("copied fine");
        setProblem("لینک با موفقیت کپی شد");
        set_open_snak(true);
      } catch (err) {
        alert("SOMETHING WRONG" + copyMe);
        setCopySuccess("Failed to copy!");
        console.log("have some copy problem");
      }
    } else {
      alert(
        "مرورگر شما اجازه دسترسی به کلیپ بورد را نمیدهد" +
          "\n" +
          "لطفا متن لینک را به صورت دستی انتخاب و کپی کنید"
      );
    }
  };

  const renderSortDefaultValue = () => {
    if (sortKey == "more_recents") {
      return "more_recents";
    } else if (sortKey == "more_viewd") {
      return "more_viewd";
    } else if (sortKey == "more_updated") {
      return "more_updated";
    }
  };

  const rednerModalContents = () => {
    if (loading) {
      return <SpinnerModalLoader />;
    }

    if (modal_kind == "new_user") {
      return (
        <div>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{ textAlign: "center", padding: "20px" }}
            >
              <div>
                <p>مشاور جدید باید بارکد زیر را اسکن کند </p>
                <div style={{ padding: 10 }}>
                  <QrCodeGenerator
                    url={
                      "https://boomlex.ir/department/" +
                      department.id +
                      "?invite_from=" +
                      user_from.phone
                    }
                    title="اسکن کنید"
                  />
                </div>
              </div>

              <div>
                <p style={{ fontSize: 14, textAlign: "center" }}>
                  یا لینک عضویت را توسط دکمه های زیر برای مشاور ارسال کنید
                </p>
                <Share
                  link={
                    "https://boomlex.ir/department/" +
                    department.id +
                    "?invite_from=" +
                    user_from.phone
                  }
                />

                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <OutlinedInput
                    value={
                      "https://boomlex.ir/department/" +
                      department.id +
                      "?invite_from=" +
                      user_from.phone
                    }
                    readOnly
                    style={{ fontSize: 14 }}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">
                        <ContentCopyIcon
                          onClick={DepartmentInviteLinkCopyClick}
                        />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                textAlign: "right",
                padding: "20px",
                background: "white",
                fontSize: 14,
              }}
            >
              <p>
                مشاور جدید بعد از ارسال درخواست باید توسط رییس یا مدیر دپارتمان
                تایید شود{" "}
              </p>
              <p>
                مشاور بعد از تایید با سمت مشاور فعال خواهد شد . که بعدا توسط
                مدیر یا رییس میتواند این سمت تغییر کند
              </p>
              <p>
                مشاور بعد از تایید به فایل ها و مشاورین فعال دپارتمان دسترسی
                خواهد داشت
              </p>
            </Grid>
          </Grid>
        </div>
      );
    } else if (modal_kind == "sort") {
      return (
        <div>
          <Grid
            container
            md={12}
            xs={12}
            style={{
              justifyContent: "right",
              textAlign: "right",
              padding: "10px 20px",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={renderSortDefaultValue()}
                name="radio-buttons-group"
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="more_recents"
                  control={<Radio />}
                  label="جدیدترین"
                  labelPlacement="start"
                />

                <FormControlLabel
                  value="more_updated"
                  control={<Radio />}
                  label="جدیدترین بروز رسانی"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="more_viewd"
                  control={<Radio />}
                  label="بیشترین بازدید"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </div>
      );
    } else if (modal_kind == "filter") {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <p>🚀 از فیلترهای جدید استفاده کنید</p>
          <p>لطفا از دکمه فیلتر در صفحه اصلی استفاده کنید</p>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ marginTop: 20 }}
          >
            فهمیدم
          </Button>
        </div>
      );
    } else if (modal_kind == "search") {
      return <p>search section</p>;
    }
  };

  const renderModalTitle = () => {
    if (modal_kind == "sort") {
      return (
        <p
          className={Styles["modal-header-title"]}
          style={{ textAlign: "right" }}
        >
          مرتب سازی بر اساس
        </p>
      );
    } else if (modal_kind == "filter") {
      return (
        <p
          className={Styles["modal-header-title"]}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <strong style={{ color: "#666" }}>فیلترها</strong>
          <strong
            onClick={() => setOpen(false)}
            style={{ color: "#0072ff", cursor: "pointer", fontSize: 14 }}
          >
            بستن
          </strong>
        </p>
      );
    } else if (modal_kind == "search") {
      return (
        <p className={Styles["modal-header-title"]}>search in everything</p>
      );
    }
  };

  const renderModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Styles["modal_wrapper"]}>
          <AppBar
            position="sticky"
            color="primary"
            sx={{ top: 0, bottom: "auto" }}
          >
            <div className={Styles["modal-header"]}>
              <Paper elevation={3} sx={{ background: "white" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item md={2} xs={2}>
                      <Button onClick={handleClose} variant="text">
                        <CloseIcon
                          className={Styles["modal-header-close-button"]}
                        />
                      </Button>
                    </Grid>
                    <Grid item md={10} xs={10}>
                      {renderModalTitle()}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </div>
          </AppBar>

          {rednerModalContents()}
        </Box>
      </Modal>
    );
  };

  useEffect(() => {
    var token = Cookies.get("id_token");
    axios({
      method: "get",
      url: "https://api.boomlex.ir/api/get-department",
      params: {
        token: token,
      },
    }).then(function (response) {
      console.log(
        "--- the data fetched from get-department in panel is ----------"
      );
      console.log(response.data);

      set_user(response.data.user);
      set_department(response.data.department);

      set_total_department_workers(response.data.total_department_workers);
      set_department_workers(response.data.department_workers);
      set_all_department_workers(response.data.department_workers);

      set_department_colleagues(response.data.colleagues);
      set_subcategories(response.data.subcategories);
      set_neighborhoods(response.data.neighborhoods);

      console.log(
        "-----------0-00-0-0----- the subcategories returned from axios is ---------0-0"
      );
      console.log(response.data.subcategories);

      const colleagues =
        response.data && response.data.colleagues
          ? response.data.colleagues
          : [];

      var selected_normal_field = colleagues.filter((cl) => {
        return cl && (cl.status == 0 || cl.stauts == 0);
      });

      set_department_waited_colleagues(
        colleagues.filter(
          (item) => item && (item.status == 0 || item.stauts == 0)
        )
      );

      set_loading(false);
    });
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  } else {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item md={2} xs={0}></Grid>

          <Grid item md={8} xs={12}>
            <div className={Styles["new-wrapper"]}>
              {(role == "رییس" || role == "مدیر") && (
                <SpeedDial
                  ariaLabel="مشاور جدید"
                  sx={{ position: "fixed", bottom: 150, right: 16 }}
                  icon={<PersonAddIcon />}
                  onClick={renderNewAgentModal}
                  FabProps={{
                    sx: {
                      bgcolor: "#7a97ff",
                      "&:hover": {
                        bgcolor: "primary.main",
                      },
                    },
                  }}
                ></SpeedDial>
              )}

              {role == "رییس" && (
                <Button
                  onClick={goToEditDepartment}
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                >
                  ویرایش دپارتمان
                </Button>
              )}
            </div>
          </Grid>

          <Grid item md={2} xs={0}></Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={2} xs={0}></Grid>
          <Grid
            className={` animate__animated animate__zoomIn   `}
            item
            md={8}
            xs={12}
          >
            {/* {renderSearchButton()} */}
          </Grid>
          <Grid item md={2} xs={0}></Grid>

          <Grid item md={12} xs={12}>
            {renderTabs()}
          </Grid>

          {renderModal()}

          <Snackbar
            open={open_snak}
            autoHideDuration={6000}
            onClose={handleCloseSnak}
          >
            <Alert
              onClose={handleCloseSnak}
              severity="success"
              sx={{ width: "100%" }}
            >
              {problem}
            </Alert>
          </Snackbar>
        </Grid>
      </>
    );
  }
};

export default DepartmentPanel;
