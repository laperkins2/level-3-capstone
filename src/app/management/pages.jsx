'use client';

import React, { useState } from 'react';

const ManagementPage = () => {
  const [goal, setGoal] = useState([]);
  const [deadline, setDeadline] = useState([]);
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  return <div>ManagementPage</div>;
};

export default ManagementPage;
