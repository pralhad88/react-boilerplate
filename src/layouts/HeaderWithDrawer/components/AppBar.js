import React from "react"
import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  withStyles,
  IconButton,
  Box,
  Typography,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  LinearProgress,
} from "@material-ui/core"
import { compose } from "recompose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { selectors as layoutSelectors } from "../../TwoColumn/store"
import NGLogo from "../../../assets/img/report_card_logo.png"
import { logOutAction } from "../../../auth"
import withUserContext from "../../../providers/UserAuth/withUserContext"
import history from "../../../providers/routing/app-history"
import { getInitialsFromName } from "../../../helpers"

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: 40,
    width: 158,
  },
  ngServiceNameContainer: {
    marginLeft: theme.spacing(1),
  },
})

const NGAppBar = ({
  classes,
  userContext,
  actions,
  toggleDrawer = () => {},
  mainPaneLoading,
  rightPaneLoading,
}) => {
  const { user, authorized } = userContext

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null)
  const profileMenuOpen = Boolean(profileMenuAnchorEl)

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null)
  }

  const handleAvatarClick = event => {
    setProfileMenuAnchorEl(event.target)
  }

  const handleLogout = () => {
    handleProfileMenuClose()
    actions.logout()
    history.push("/login")
  }

  return (
    <React.Fragment>
      {(mainPaneLoading || rightPaneLoading) && <LinearProgress />}
      <AppBar position="sticky" className={classes.appBar} color="transparent">
        <Toolbar>
          {!authorized && (
            <IconButton edge="start" color="black" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Box className={classes.logoContainer}>
            <img
              src={NGLogo}
              className={classes.logoImg}
              alt="NavGurukul Logo"
            />
            {/* <Box className={classes.ngServiceNameContainer}>
              <Typography variant="h6" style={{ fontWeight: 100 }}>
                Admissions
              </Typography>
            </Box> */}
          </Box>
          {authorized && (
            <Box>
              <IconButton color="inherit" onClick={handleAvatarClick}>
                <Avatar
                  src={user.profile_picture ? user.profile_picture : undefined}
                >
                  {getInitialsFromName(user.name)}
                </Avatar>
              </IconButton>
              <Menu
                id="user-avatar-menu"
                anchorEl={profileMenuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={profileMenuOpen}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  mainPaneLoading: layoutSelectors.selectMainPaneLoading(state),
  rightPaneLoading: layoutSelectors.selectRightPaneLoading(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout: logOutAction }, dispatch),
})

export default compose(
  withUserContext,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(NGAppBar)
