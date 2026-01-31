const StatusCell = ({ status }) => {
    const statusList = [
        {
            id: 1,
            name: "Active",
            value: "active",
            color: "#27AE60", // stronger green
            bgColor: "#D1F3E0", // soft green background
        },
        {
            id: 2,
            name: "Inactive",
            value: "inactive",
            color: "#C0392B", // deeper red
            bgColor: "#F8D7DA", // soft red background
        },
        {
            id: 3,
            name: "Pending",
            value: "pending",
            color: "#D35400", // richer orange
            bgColor: "#FFEAC0", // warm yellow background
        },
        {
            id: 4,
            name: "Paused",
            value: "paused",
            color: "#2980B9", // stronger blue
            bgColor: "#D6E8FF", // light blue background
        },
        {
            id: 5,
            name: "Completed",
            value: "completed",
            color: "#2E7D32", // strong green
            bgColor: "#C8E6C9", // slightly stronger soft green
        },
        {
            id: 6,
            name: "Failed",
            value: "failed",
            color: "#E74C3C", // vivid red
            bgColor: "#FDECEA", // soft red/pink background
        },
        {
            id: 7,
            name: "Cancelled",
            value: "cancelled",
            color: "#8E44AD", // purple
            bgColor: "#EADCF9", // soft purple background
        }
    ];

    const currentStatus = statusList.find(item => item.value === status);

    return (
        <div
            className="flex justify-center items-center px-2.5 py-1 gap-1.5 rounded-xl"
            style={{
                backgroundColor: currentStatus?.bgColor
            }}
        >
            <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                    backgroundColor: currentStatus?.color
                }}
            ></div>
            <p className="text-[#494949] font-satoshi text-xs font-normal leading-4">
                {currentStatus?.name}
            </p>
        </div>
    )
}

export default StatusCell;
