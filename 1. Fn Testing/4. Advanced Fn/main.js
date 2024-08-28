import axios from 'axios';

/* ------------------------- Test --> Fetching Data ------------------------- */
export async function fetchPost(postId) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        return response;
    } catch (error) {
        throw new Error('Request failed')
    }
}


/* ---------------- Test --> Instance is of type "something" ---------------- */
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getDetails() {
        return `${this.name} (${this.email})`;
    }
}

class Admin extends User {
    constructor(name, email, adminCode) {
        super(name, email);
        this.adminCode = adminCode;
    }

    getAdminDetails() {
        return `Admin: ${this.name} (${this.email}) - Code: ${this.adminCode}`;
    }
}

function getDetails(user) {
    if (user instanceof Admin) {
        return user.getAdminDetails();
    } else if (user instanceof User) {
        return user.getDetails();
    } else {
        throw new Error('Invalid user type');
    }
}

export { User, Admin, getDetails };
