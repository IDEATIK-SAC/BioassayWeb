import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    palette: {
        primary: {
            light: "#022C3B",
            main: "#022C3B",
            dark: "#044C66",
            contrastText: "#000000"
        },
        secondary: {
            main: '#022C3B',
        }
    }

});

export default Theme;