
-- @block
CREATE TABLE Manager (
  Manager_ID INT PRIMARY KEY,
  Name VARCHAR(30) NOT NULL,
  Email_ID VARCHAR(25) NOT NULL UNIQUE,
  Department VARCHAR(55)
);


-- @block
CREATE TABLE Employee (
  Employee_ID INT PRIMARY KEY,
  Name VARCHAR(80) NOT NULL,
  Email_ID VARCHAR(25) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Department VARCHAR(80),
  Role VARCHAR(40) NOT NULL,
  Date_Joined DATE NOT NULL
);


-- @block
CREATE TABLE Workspace (
  Workspace_ID INT PRIMARY KEY,
  Title VARCHAR(120) NOT NULL,
  Description TEXT,
  Created_By INT NOT NULL,
  Created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ws_creator
    FOREIGN KEY (Created_By) REFERENCES Employee(Employee_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE
);


-- @block
CREATE TABLE Workspace_mem (
  Member_ID INT PRIMARY KEY,
  Workspace_ID INT NOT NULL,
  Employee_ID INT NOT NULL,
  Join_Date DATE NOT NULL,
  CONSTRAINT fk_wsm_ws
    FOREIGN KEY (Workspace_ID) REFERENCES Workspace(Workspace_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_wsm_emp
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT uq_wsm UNIQUE (Workspace_ID, Employee_ID)
);


-- @block
CREATE TABLE Announcement (
  Announcement_ID INT PRIMARY KEY,
  Workspace_ID INT NOT NULL,
  Posted_By INT NOT NULL,          
  Title VARCHAR(120) NOT NULL,
  Content TEXT NOT NULL,
  Posted_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ann_ws
    FOREIGN KEY (Workspace_ID) REFERENCES Workspace(Workspace_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ann_poster
    FOREIGN KEY (Posted_By) REFERENCES Employee(Employee_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

-- @block
CREATE TABLE Project (
  Project_ID INT PRIMARY KEY,
  Manager_ID INT NOT NULL,
  Title VARCHAR(120) NOT NULL,
  Description TEXT,
  Start_Date DATE NOT NULL,
  End_Date DATE,
  CONSTRAINT fk_proj_manager
    FOREIGN KEY (Manager_ID) REFERENCES Manager(Manager_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_project_dates CHECK (End_Date IS NULL OR End_Date >= Start_Date)
);


-- @block
CREATE TABLE Task (
  Task_ID INT PRIMARY KEY,
  Project_ID INT NOT NULL,
  Title VARCHAR(120) NOT NULL,
  Description TEXT,
  Due_Date DATE,
  Status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_task_project
    FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_task_status CHECK (Status IN ('Pending','In Progress','Blocked','Done'))
);


-- @block
CREATE TABLE Assignment (
  Assignment_ID INT PRIMARY KEY,
  Task_ID INT NOT NULL,
  Employee_ID INT NOT NULL,
  Assigned_Date DATE NOT NULL,
  Project_ID INT NOT NULL,  
  CONSTRAINT fk_asgn_task
    FOREIGN KEY (Task_ID) REFERENCES Task(Task_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_asgn_emp
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_asgn_proj
    FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT uq_asgn UNIQUE (Task_ID, Employee_ID)
);


-- @block
CREATE TABLE Submission (
  Submission_ID INT PRIMARY KEY,
  Assignment_ID INT NOT NULL,
  Submitted_Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  File_URL VARCHAR(300),
  Status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_sub_asgn
    FOREIGN KEY (Assignment_ID) REFERENCES Assignment(Assignment_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_sub_status CHECK (Status IN ('Submitted','Reviewed','Approved','Rejected'))
);

-- @block
CREATE TABLE Comment (
  Comment_ID INT PRIMARY KEY,
  Submission_ID INT NOT NULL,
  Employee_ID INT NOT NULL,
  Timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Content         TEXT NOT NULL,
  CONSTRAINT fk_cmt_sub
    FOREIGN KEY (Submission_ID) REFERENCES Submission(Submission_ID)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cmt_emp
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

-- @block
INSERT INTO Manager (Manager_ID, Name, Email_ID, Department) VALUES
(201, 'Alice Johnson', 'alice.johnson@company.com', 'IT'),
(202, 'Robert Smith', 'robert.smith@company.com', 'Finance');

-- @block
INSERT INTO Employee (Employee_ID, Name, Email_ID, Password, Department, Role, Date_Joined) VALUES
(1, 'Rajbir Biswas', 'rajbir@company.com', 'hashed_pwd_123', 'IT', 'Developer', '2025-01-10'),
(2, 'Preity Sharma', 'preity@company.com', 'hashed_pwd_456', 'IT', 'Tester', '2025-02-15'),
(3, 'Manish Kumar', 'manish@company.com', 'hashed_pwd_789', 'Finance', 'Analyst', '2025-03-01'),
(4, 'Srijan Sen', 'srijan@company.com', 'hashed_pwd_111', 'Finance', 'Intern', '2025-04-05');


-- @block
INSERT INTO Workspace (Workspace_ID, Title, Description, Created_By) VALUES
(101, 'AI Research Lab', 'Workspace for AI & ML research team', 1),
(102, 'Finance Hub', 'Workspace for finance & trading analysis', 3);


-- @block
INSERT INTO Workspace_mem (Member_ID, Workspace_ID, Employee_ID, Join_Date) VALUES
(1001, 101, 1, '2025-01-15'),  -- Rajbir in AI Lab
(1002, 101, 2, '2025-02-20'),  -- Preity in AI Lab
(1003, 102, 3, '2025-03-10'),  -- Manish in Finance Hub
(1004, 102, 4, '2025-04-12');  -- Srijan in Finance Hub

-- @block
INSERT INTO Announcement (Announcement_ID, Workspace_ID, Posted_By, Title, Content) VALUES
(2001, 101, 1, 'Kickoff Meeting', 'AI Project kickoff meeting scheduled on Feb 1, 2025.'),
(2002, 102, 3, 'Finance Report Update', 'Q1 financial report will be published next week.');

-- @block
INSERT INTO Project (Project_ID, Manager_ID, Title, Description, Start_Date, End_Date) VALUES
(501, 201, 'AI Chatbot System', 'Building an AI chatbot for customer support', '2025-02-01', '2025-07-30'),
(502, 202, 'Risk Analysis Model', 'Financial risk analysis automation project', '2025-03-01', NULL);

-- @block
INSERT INTO Task (Task_ID, Project_ID, Title, Description, Due_Date, Status) VALUES
(601, 501, 'Design Chatbot Architecture', 'Plan conversation flow & NLP modules', '2025-03-15', 'Pending'),
(602, 501, 'Implement NLP Module', 'Develop core natural language processing', '2025-05-01', 'In Progress'),
(603, 502, 'Data Collection', 'Gather financial data for risk model', '2025-04-15', 'Done');

-- @block
INSERT INTO Assignment (Assignment_ID, Task_ID, Employee_ID, Assigned_Date, Project_ID) VALUES
(701, 601, 1, '2025-02-10', 501),  -- Rajbir on chatbot architecture
(702, 602, 2, '2025-03-05', 501),  -- Preity on NLP module
(703, 603, 3, '2025-03-20', 502);  -- Manish on data collection


-- @block
INSERT INTO Submission (Submission_ID, Assignment_ID, File_URL, Status) VALUES
(801, 701, 'http://files.com/chatbot_architecture.pdf', 'Submitted'),
(802, 702, 'http://files.com/nlp_module.zip', 'Reviewed'),
(803, 703, 'http://files.com/risk_data.xlsx', 'Approved');

-- @block
INSERT INTO Comment (Comment_ID, Submission_ID, Employee_ID, Content) VALUES
(901, 801, 2, 'Looks good, please refine flow diagrams.'),
(902, 802, 1, 'Great work, NLP model needs more training data.'),
(903, 803, 4, 'Dataset verified and approved.');


-- @block
SELECT * FROM comment;
