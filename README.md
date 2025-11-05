
## 🗄️ Database Schema

The WorkSync database consists of 10 normalized tables:

### Core Tables
- **Manager** - Manager information
- **Employee** - Employee details and authentication
- **Workspace** - Team workspaces
- **Workspace_mem** - Workspace membership
- **Project** - Projects managed by managers
- **Task** - Individual tasks within projects
- **Assignment** - Task assignments to employees
- **Submission** - Work submissions by employees
- **Comment** - Comments on submissions
- **Announcement** - Workspace announcements

### Key Relationships
- Workspaces → Projects (one-to-many)
- Projects → Tasks (one-to-many)
- Tasks → Assignments (one-to-many)
- Assignments → Submissions (one-to-many)
- Submissions → Comments (one-to-many)

### Sample Data
The database includes sample data for:
- 2 Managers (Alice Johnson, Robert Smith)
- 4 Employees (Rajbir, Preity, Manish, Srijan)
- 2 Workspaces (AI Research Lab, Finance Hub)
- 2 Projects (AI Chatbot System, Risk Analysis Model)
- 3 Tasks with assignments and submissions

## 👥 User Roles

### Employee
- View assigned tasks and due dates
- Upload and manage submissions
- Post comments on submissions
- View workspace announcements
- Track personal work progress

### Manager
- All employee capabilities, plus:
- Create and manage projects
- Assign tasks to employees
- Review and approve submissions
- Post workspace announcements
- View team workload and analytics

## 📸 Screenshots

### Dashboard (Employee View)
![Employee Dashboard](https://via.placeholder.com/800x500?text=Employee+Dashboard)

### Projects Page
![Projects Page](https://via.placeholder.com/800x500?text=Projects+Page)

### My Work (Employee)
![My Work](https://via.placeholder.com/800x500?text=My+Work+Page)

### Task Detail Drawer
![Task Drawer](https://via.placeholder.com/800x500?text=Task+Detail+Drawer)

## 🎨 Design System

WorkSync uses a carefully crafted design system for consistency:

### Color Palette
- **Primary**: `#2563EB` (Blue) - Links, CTAs, active states
- **Success**: `#059669` (Green) - Approved, Done
- **Warning**: `#D97706` (Orange) - Pending, Reviewed
- **Danger**: `#DC2626` (Red) - Rejected, Blocked
- **Neutrals**: Gray scale from `#111827` to `#FAFAFA`

### Typography
- **Font Family**: Inter (system fallbacks)
- **Sizes**: 32px / 24px / 16px / 14px / 12px
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
8px grid system: `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px`

### Components
All components are accessible, keyboard-navigable, and follow WCAG AA contrast ratios.

## 📝 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
Optimizes the build for best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use semantic HTML
- Follow existing CSS naming conventions (BEM-inspired)
- Ensure all new features are keyboard accessible
- Test on multiple screen sizes
- Add comments for complex logic

## 📄 License

This project is part of a DBMS course assignment and is for educational purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Haltheworst](https://github.com/Haltheworst)
- LinkedIn: [Praket-kumar](https://linkedin.com/in/praket-kumar)

## 🙏 Acknowledgments

- Design inspiration from modern project management tools
- [React Documentation](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inter Font](https://rsms.me/inter/) by Rasmus Andersson

---

**Built with ❤️ for DBMS Course Project**


