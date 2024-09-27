import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { labModel } from '../models/lab.js'; // Import the lab model

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the directory exists before writing the file
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

class LabController {
  // Create Lab Layout and save to a file
  static createLabLayout = async (req, res) => {
    const { labName, numSystems } = req.body;

    if (!labName) {
      return res.status(400).json({ message: 'Lab name is required' });
    }

    console.log('Lab Name:', labName);

    // Define directory path for the frontend
    const dirPath = path.join('F:/ams/bvm_ams_frontend/src/app/views/labs');
    const filePath = path.join(dirPath, `${labName}LabLayout.jsx`);

    console.log('File Path:', filePath);

    // Ensure directory exists
    ensureDirectoryExists(dirPath);

    const content = `
    import React, { useState, useEffect } from 'react';
    import { Box, Grid, IconButton, Paper, Tooltip, Typography, Button } from '@mui/material';
    import { Breadcrumb, SimpleCard } from 'app/components';
    import { styled } from '@mui/system';
    import { DndProvider, useDrag } from 'react-dnd';
    import { HTML5Backend } from 'react-dnd-html5-backend';
    import ComputerIcon from '@mui/icons-material/Computer';
    import MemoryIcon from '@mui/icons-material/Memory';
    import KeyboardIcon from '@mui/icons-material/Keyboard';
    import MouseIcon from '@mui/icons-material/Mouse';
    import ChairIcon from '@mui/icons-material/Chair';
    import axios from 'axios';
    import { BASE_URL } from 'envConfig'; // Replace with your config
    
    const LabLayoutRoot = styled('div')(({ theme }) => ({
      margin: '30px',
      [theme.breakpoints.down('sm')]: { margin: '16px' },
      '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
      },
      '& .lab-grid': {
        overflowX: 'auto',
        padding: theme.spacing(4),
        position: 'relative',
        height: '500px',
        border: '1px solid #ccc',
        marginTop: theme.spacing(4),
      },
    }));
    
    const RotatedPaper = styled(Paper)(({ top, left }) => ({
      position: 'absolute',
      width: 100,
      top: \`\${top}px\`,
      left: \`\${left}px\`,
      cursor: 'move',
    }));
    
    // PC component with icons and drag-and-drop functionality
    const PC = ({ index, top, left, movePC, isEditMode }) => {
      const [, drag] = useDrag({
        type: 'PC',
        item: { index, top, left },
        canDrag: isEditMode,
        end: (item, monitor) => {
          const delta = monitor.getDifferenceFromInitialOffset();
          if (item && delta) {
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            movePC(item.index, newTop, newLeft);
          }
        },
      });
    
      const handleClick = (componentName) => {
        alert(\`Clicked on: \${componentName}\`);
      };
 
      return (
        <RotatedPaper ref={drag} top={top} left={left}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={0.1} justifyContent="center">
                <Grid item>
                  <Tooltip title="Monitor">
                    <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Monitor')}>
                      <ComputerIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="CPU">
                    <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('CPU')}>
                      <MemoryIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0.1} justifyContent="center">
                <Grid item>
                  <Tooltip title="Keyboard">
                    <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Keyboard')}>
                      <KeyboardIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Mouse">
                    <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Mouse')}>
                      <MouseIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0.1} justifyContent="center">
                <Grid item>
                  <Tooltip title="Chair">
                    <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Chair')}>
                      <ChairIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography align="center">{index + 1}</Typography>
        </RotatedPaper>
      );
    };
    
    export default function ${labName}LabLayout() {
      const [isEditMode, setEditMode] = useState(false);
      const [pcPositions, setPcPositions] = useState([...Array(${numSystems})].map(() => ({ top: 0, left: 0 })));
      const [userRole, setUserRole] = useState('');
    
      // Fetch positions from the database on mount
      useEffect(() => {
        const fetchLabLayout = async () => {
          try {
          const headers = {
      Authorization: "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/json', 
    };
            const response = await axios.get(\`\${BASE_URL}/labs/${labName}/layout\`,{ headers });
            setPcPositions(response.data.data || pcPositions);
            const storedRole = localStorage.getItem('role'); 
        setUserRole(storedRole);
          } catch (error) {
            console.error('Error fetching lab layout:', error);
          }
        };
        fetchLabLayout();
      },[]); 
    
      const movePC = (index, newTop, newLeft) => {
        setPcPositions((prevPositions) => {
          const updatedPositions = [...prevPositions];
          updatedPositions[index] = { top: newTop, left: newLeft };
          return updatedPositions;
        });
      };
    
      const saveLayout = async () => {
        try {
        const headers = {
      Authorization: "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/json', // Optional: Specify content type
    };
          await axios.put(\`\${BASE_URL}/labs/${labName}/layout\`, { pcPositions },{ headers });
          setEditMode(false); // Exit edit mode after saving
        } catch (error) {
          console.error('Error saving layout:', error);
        }
      };
    
      return (
        <LabLayoutRoot>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: 'Labs', path: '/labs' }, { name: '${labName}' }]} />
          </Box>
    
          <SimpleCard title="${labName}">
           {userRole === 'Coordinator' && (
            <Button variant="contained" onClick={() => (isEditMode ? saveLayout() : setEditMode(true))}>
              {isEditMode ? 'Save Layout' : 'Edit Layout'}
            </Button>
            )}
            <Box className="lab-grid">
              <DndProvider backend={HTML5Backend}>
                <Grid container spacing={2}>
                  {pcPositions.map((pos, index) => (
                    <Grid item style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                      <PC index={index} top={pos.top} left={pos.left} movePC={movePC} isEditMode={isEditMode} />
                    </Grid>
                  ))}
                </Grid>
              </DndProvider>
            </Box>
          </SimpleCard>
        </LabLayoutRoot>
      );
    }
    `;
    
    // Write the content to the file
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        return res.status(500).json({ message: 'Error creating file' });
      }
      console.log('File created successfully in the frontend');
      res.status(200).json({ message: 'File created successfully in the frontend' });
    });
  };

 // Add Lab
static addLab = async (req, res) => {
  const { labName, numSystems } = req.body;
  try {
    const existingLab = await labModel.findOne({ labName });
    if (existingLab) {
      return res.status(400).json({ message: "Lab already exists." });
    }

    // Create pcCoordinates array with (0, 0) for each system
    const pcCoordinates = Array.from({ length: numSystems }, () => ({
      top: 0,
      left: 0,
    }));

    const newLab = new labModel({ labName, numSystems, pcCoordinates });
    const savedLab = await newLab.save();
    return res.status(201).json({ message: "Lab added successfully.", data: savedLab });
  } catch (error) {
    console.log("Error adding lab: " + error);
    return res.status(400).json({ message: error.message });
  }
};



  // Get All Labs
  static getLabs = async (req, res) => {
    try {
      const labs = await labModel.find();
      return res.status(200).json({ message: "All labs found successfully.", data: labs });
    } catch (error) {
      console.log("Error fetching labs: " + error);
      return res.status(400).json({ message: error.message });
    }
  };

  // Get a Lab by Name
  static getLab = async (req, res) => {
    const labName = req.params.labName;
    try {
      const lab = await labModel.findOne({ labName });
      if (!lab) {
        return res.status(404).json({ message: "Lab not found." });
      }
      return res.status(200).json({ message: "Lab found successfully.", data: lab });
    } catch (error) {
      console.log("Error fetching lab: " + error);
      return res.status(400).json({ message: error.message });
    }
  };

  static getLabLayout = async (req, res) => {
    const { labName } = req.params; // Extract labName from request parameters
    try {
      const lab = await labModel.findOne({ labName });
      if (!lab) {
        return res.status(404).json({ message: "Lab not found." });
      }
      return res.status(200).json({ message: "Lab layout retrieved successfully.", data: lab.pcCoordinates });
    } catch (error) {
      console.log("Error retrieving lab layout: " + error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  static updateLabLayout = async (req, res) => {
    const labName = req.params.labName;
    const { pcPositions } = req.body;
  console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  
    try {
      const lab = await labModel.findOne({ labName });
      if (!lab) {
        return res.status(404).json({ message: "Lab not found." });
      }
  
      // Update the pcCoordinates with the new positions
      lab.pcCoordinates = pcPositions; // Update the pcCoordinates field
      const updatedLab = await lab.save();
  
      return res.status(200).json({ message: "Lab layout updated successfully.", data: updatedLab });
    } catch (error) {
      console.log("Error updating lab layout: " + error);
      return res.status(400).json({ message: error.message });
    }
  };
  

  // Update a Lab
  static updateLab = async (req, res) => {
    const labName = req.params.labName;
    const { numSystems } = req.body;
    try {
      const lab = await labModel.findOne({ labName });
      if (!lab) {
        return res.status(404).json({ message: "Lab not found." });
      }
      lab.numSystems = numSystems || lab.numSystems; // Update only if provided
      const updatedLab = await lab.save();
      return res.status(200).json({ message: "Lab updated successfully.", data: updatedLab });
    } catch (error) {
      console.log("Error updating lab: " + error);
      return res.status(400).json({ message: error.message });
    }
  };

  // Delete a Lab
  static deleteLab = async (req, res) => {
    const labName = req.params.labName;
    try {
      const deletion = await labModel.deleteOne({ labName });
      if (deletion.deletedCount === 0) {
        return res.status(404).json({ message: "Lab not found." });
      }
      return res.status(200).json({ message: "Lab deleted successfully.", data: deletion });
    } catch (error) {
      console.log("Error deleting lab: " + error);
      return res.status(400).json({ message: error.message });
    }
  };
}

export default LabController;
