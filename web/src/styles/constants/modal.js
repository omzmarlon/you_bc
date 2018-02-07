export const modalStyles = {
    dialogRoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 0
    },

    // TODO: refactor styles that depend on user device
    dialogContent: {
        position: "relative",
        width: "90vw",
        transform: "",
    },

    dialogContentIOS: {
        width: "90vw"
    },
    dialogBody: {
        paddingBottom: 0
    }
};