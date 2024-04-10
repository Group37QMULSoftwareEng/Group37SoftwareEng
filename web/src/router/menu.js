const menu = {
    root: [
        {
            id: 1,
            name: "/index",
            icon: "house",
            alias: "Home"
        },
        {
            id: 2,
            name: "/userlist",
            icon: "User",
            alias: "User"
        },
        {
            id: 3,
            name: "/orderlist",
            icon: "Document",
            alias: "Transaction"
        },
        {
            id: 4,
            name: "/analy",
            icon: "DataLine",
            alias: "Analytics"
        }
    ],
    user: [
        {
            id: 1,
            name: "/index",
            icon: "house",
            alias: "Home"
        },
        {
            id: 2,
            name: "/transaction",
            icon: "Money",
            alias: "Transaction",
            children: [
                {
                    id: 22,
                    name: "/trade",
                    icon: "Switch",
                    alias: "Create Transaction"
                },
                {
                    id: 23,
                    name: "/send",
                    icon: "CircleCheck",
                    alias: "Transaction Sent"
                },
                {
                    id: 24,
                    name: "/receive",
                    icon: "Position",
                    alias: "Transactions Received"
                }
            ]
        },
        {
            id: 3,
            name: "/wallet",
            icon: "Wallet",
            alias: "Wallet",
            children: [
                {
                    id: 31,
                    name: "/addwallet",
                    icon: "WalletFilled",
                    alias: "Create Wallet"
                },
                {
                    id: 32,
                    name: "/listwallet",
                    icon: "Files",
                    alias: "Wallet List"
                },
                {
                    id: 33,
                    name: "/postrader",
                    icon: "Postcard",
                    alias: "Wallet Transfer"
                }
            ]
        },
        {
            id: 4,
            name: "/user",
            icon: "User",
            alias: "User"
        }
    ]
}

export default menu