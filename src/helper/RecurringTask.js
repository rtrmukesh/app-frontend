class RecurringTask {
    static monthOption = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 }
    ];
    static typeOptions = [
        {
            label: "Daily",
            value: "Daily"
        },
        {
            label: "Weekly",
            value: "Weekly"
        },
        {
            label: "Monthly",
            value: "Monthly"
        },
        {
            label: "Annually",
            value: "Annually"
        }
    ];
}
export default RecurringTask;