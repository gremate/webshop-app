import { createTheme } from '@mui/material';

const colors = {
    green: '#00e300',
    lightGray: '#ababab',
    darkGray: '#212121'
};
export const theme = createTheme({
    components: {
        MuiSwitch: {
            styleOverrides: {
                colorPrimary: {
                    '&.Mui-checked': {
                        color: colors.green
                    }
                },
                track: {
                    opacity: 1,
                    backgroundColor: colors.lightGray,
                    '.Mui-checked.Mui-checked + &': {
                        opacity: 1,
                        backgroundColor: colors.lightGray
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    color: 'white'
                },
                root: {
                    backgroundColor: colors.darkGray,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white !important'
                    }
                },
                icon: {
                    color: 'white'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'white !important'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: 'white',
                        backgroundColor: colors.darkGray
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white !important'
                    }
                }
            }
        }
    }
});
