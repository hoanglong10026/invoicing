const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const formatNumber = (number) => {
    return formatter.format(number);
};
