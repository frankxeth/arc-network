// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract ArcWork {
    IERC20 public usdc;

    enum Status { Open, Active, Submitted, Completed, Cancelled }

    struct Job {
        uint256 id;
        address client;
        address agent;
        string title;
        string description;
        uint256 budget;
        Status status;
        string deliverable;
    }

    uint256 public jobCount;
    mapping(uint256 => Job) public jobs;

    event JobPosted(uint256 indexed id, address indexed client, string title, uint256 budget);
    event JobAccepted(uint256 indexed id, address indexed agent);
    event JobSubmitted(uint256 indexed id, string deliverable);
    event JobCompleted(uint256 indexed id, address indexed agent, uint256 payment);
    event JobCancelled(uint256 indexed id);

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function postJob(string memory title, string memory description, uint256 budget) external {
        require(budget > 0, "Budget must be greater than 0");
        usdc.transferFrom(msg.sender, address(this), budget);
        jobCount++;
        jobs[jobCount] = Job(jobCount, msg.sender, address(0), title, description, budget, Status.Open, "");
        emit JobPosted(jobCount, msg.sender, title, budget);
    }

    function acceptJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.status == Status.Open, "Job not open");
        require(job.client != msg.sender, "Client cannot accept own job");
        job.agent = msg.sender;
        job.status = Status.Active;
        emit JobAccepted(jobId, msg.sender);
    }

    function submitJob(uint256 jobId, string memory deliverable) external {
        Job storage job = jobs[jobId];
        require(job.status == Status.Active, "Job not active");
        require(job.agent == msg.sender, "Only assigned agent");
        job.deliverable = deliverable;
        job.status = Status.Submitted;
        emit JobSubmitted(jobId, deliverable);
    }

    function completeJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.status == Status.Submitted, "Job not submitted");
        require(job.client == msg.sender, "Only client");
        job.status = Status.Completed;
        usdc.transfer(job.agent, job.budget);
        emit JobCompleted(jobId, job.agent, job.budget);
    }

    function cancelJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.status == Status.Open, "Can only cancel open jobs");
        require(job.client == msg.sender, "Only client");
        job.status = Status.Cancelled;
        usdc.transfer(job.client, job.budget);
        emit JobCancelled(jobId);
    }

    function getJob(uint256 jobId) external view returns (Job memory) {
        return jobs[jobId];
    }
}
