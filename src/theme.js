// Central place to tweak QuickHire's Ant Design theme.
// Change colorPrimary here and it updates every antd Button, Link, etc. app-wide.
export const themeConfig = {
  token: {
    colorPrimary: "#FF6B00",
    colorLink: "#FF6B00",
    colorLinkHover: "#FF7A1A",
    borderRadius: 12,
    fontFamily:
      "'Montserrat', system-ui, -apple-system, sans-serif",
  },
  components: {
    Button: {
      controlHeightLG: 52,
      fontWeight: 500,
    },
    Card: {
      borderRadiusLG: 16,
    },
  },
};