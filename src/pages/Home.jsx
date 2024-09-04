import React from "react";
import ProjectStatistics from "../components/ProjectStatistics";
import Platforms from '../components/Platforms';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import MemberCard from '../components/MemberCard';

const projects = [
    {
      id: 1,
      name: "Website Redesign",
      type: "Web Development",
      date: "2024-03-15",
      members: ["Alice", "Bob", "Charlie"],
      files: 4,
      progress: 20,
    },
    {
      id: 2,
      name: "Mobile App Development",
      type: "Mobile Application",
      date: "2024-02-10",
      members: ["David", "Eva", "Frank"],
      files: 9,
      progress: 80,
    },
    {
      id: 3,
      name: "Marketing Campaign",
      type: "Marketing",
      date: "2024-04-25",
      members: ["Grace", "Henry", "Ivy"],
      files: 1,
      progress: 18,
    },
    {
      id: 4,
      name: "Product Launch",
      type: "Product Management",
      date: "2024-01-05",
      members: ["Jack", "Kelly", "Liam"],
      files: 2,
      progress: 6,
    },
  ];
  const clients = [
    {
      id: 1,
      name: "ABC Corporation",
      title: "CEO",
      date: "2024-04-10T09:00:00Z",
    },
    {
      id: 2,
      name: "XYZ Company",
      title: "Marketing Director",
      date: "2024-03-20T14:30:00Z",
    },
    {
      id: 3,
      name: "123 Industries",
      title: "Project Manager",
      date: "2024-05-05T11:15:00Z",
    },
    {
      id: 4,
      name: "Tech Innovations Ltd.",
      title: "CTO",
      date: "2024-02-15T10:45:00Z",
    },
  ];
  const members = [
    {
      id: 1,
      total_members: 4,
      job: "UI Designer",
    },
    {
      id: 2,
      total_members: 8,
      job: "Frontend Developer",
    },
    {
      id: 3,
      total_members: 3,
      job: "Backend Developer",
    },
    {
      id: 4,
      total_members: 6,
      job: "Mobile App Developer",
    },
  ];



const Home = () => {
    return(
        <div className="px-6">
            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
                <ProjectStatistics />
                <Platforms />
            </div>

            {/* Project Cards */}
            <div>
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-lg font-semibold">Currrent Projects</h1>
                  <p className="text-sm underline text-indigo-600">See all</p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {
                    projects && projects.map((project) => <ProjectCard key={project.id} project={project}/>)
                  }  
                </div>
            </div>


            {/* Client Cards */}
            <div>
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-lg font-semibold">Currrent Clients</h1>
                  <p className="text-sm underline text-indigo-600">See all</p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {
                    clients && clients.map((client) => <ClientCard key={client.id} client={client}/>)
                  }  
                </div>
            </div>


            {/* Members */}
            <div>
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-lg font-semibold">Members</h1>
                  <p className="text-sm underline text-indigo-600">See all</p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {
                    members && members.map((member) => <MemberCard key={member.id} member={member}/>)
                  }  
                </div>
            </div>
        </div>
    )
}

export default Home;