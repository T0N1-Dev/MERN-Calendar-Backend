const colors = ["#e61b1b", "#e5910d", "#d6ce14", "#51a42d", "#2986cc", "#adec93", "#ff7e7e", "#ff1ca1", "#ff9f3a", "#37a9ed", "#660000", "#000066", "#4a53ff", "#fff777", "#e01d37"];

export const randomElement = () => { 
    return colors[Math.floor(Math.random() * colors.length)];
}