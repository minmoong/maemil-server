type user = {
    sid: number;
    name: string;
    id: string;
    password: string;
    email?: string;
}

const users: user[] = [
    {
        sid: 3104,
        name: '김민규',
        id: 'minmoong',
        password: '$2a$10$F0rEufdaDCbnik7AsAKWqecirf0Jay/gKuVv0./NH47qZkgewjtA.',
        email: 'kim774634@gmail.com'
    },
    {
        sid: 3202,
        name: '김성진',
        id: 'afosvpaqa',
        password: '$2a$10$54xe0WHAQ1h0xf.IIw1kQePOnyPRKrXbGEO8P1MNMpi/spIivTBya'
    }
]

export default users