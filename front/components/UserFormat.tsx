import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Tooltip } from 'components';
import { UserShort, userApi } from 'services/user';
import { personnelApi } from 'services/personnel';

type User = {
  id: number;
  name: string;
  username: string;
}
type Job = {
  departmentName: string;
  title: string;
  type: string;
  position: string;
  class?: string;
  duty?: string;
}

const UserFormat = (props: { id?: number, user?: UserShort }) => {

  const { id, user: propUser } = props;

  if (typeof id === 'undefined' && typeof propUser === 'undefined') {
    return (<>
      error: UserFormat has no property
    </>);
  }
  const [user, setUser] = useState<User | undefined>();
  const [job, setJob] = useState<Job | undefined>();

  useEffect(() => {
    if (typeof id !== 'undefined') {
      userApi.getOne(id).then((data) => {
        setUser({
          id: data.id,
          name: data.name,
          username: data.username
        });
      });
    } else {
      setUser(propUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      personnelApi.getJob(user.id).then((data) => {
        setJob({
          departmentName: data.department.name,
          title: data.jobTitle,
          type: data.jobType,
          position: data.jobPosition,
          class: data.jobClass,
          duty: data.jobDuty,
        });
      }).catch(() => setJob(undefined));
    }
  }, [user]);
  if (!user) {
    return (
      <Typography>불러오는 중</Typography>
    );
  }

  return (
    <Tooltip
      title={
        <>
          {job && (
            <>
              {job.departmentName} {job.title}
              <br />
            </>
          )}
          {user.username}
        </>
      }
      placement="bottom"
    >
      <Typography>
        {`${user.name}${job ? ` ${job.title}` : ''}`}
      </Typography>
    </Tooltip>
  );
};

export default UserFormat;
