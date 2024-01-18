const baseTheme = {
    media: {
        extraLarge: '(max-width: 1140px)',
        large: '(max-width: 960px)',
        medium: '(max-width: 720px)',
        small: '(max-width: 540px)',
    },

    sizes: {
        menu: { width: '300px' },
        borderRadius: '5px',
        main: { height: window.innerHeight },
    },
}

export const lightTheme = {
    mode: 'light',
    colors: {
        primary: '#fff',
        secondary: '#4EABF5',
        secondaryDark: '#4C84B0',
        sidebar: '#363A41',
        grey: '#C8C8C8',
        text: '#2D333A',
        danger: '#DE4045',
        profile: '#FFC107',
        bgContent: '#F7F7F7',
    },
    ...baseTheme,
}
