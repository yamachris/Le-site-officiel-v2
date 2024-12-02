import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`console-tabpanel-${index}`}
      aria-labelledby={`console-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Types pour les logs et métriques
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

interface Metric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

interface DatabaseStats {
  totalUsers: number;
  totalGames: number;
  totalTournaments: number;
  databaseSize: string;
  lastBackup: string;
}

const AdminConsole: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [dbStats, setDbStats] = useState<DatabaseStats>({
    totalUsers: 0,
    totalGames: 0,
    totalTournaments: 0,
    databaseSize: '0 MB',
    lastBackup: '-'
  });
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simuler le chargement des données initiales
  useEffect(() => {
    // Mock data
    setLogs([
      {
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'Failed to connect to Redis cache',
        source: 'cache-service'
      },
      {
        timestamp: new Date().toISOString(),
        level: 'warning',
        message: 'High memory usage detected',
        source: 'system-monitor'
      },
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Backup completed successfully',
        source: 'backup-service'
      }
    ]);

    setMetrics([
      {
        name: 'CPU Usage',
        value: 45,
        unit: '%',
        status: 'normal'
      },
      {
        name: 'Memory Usage',
        value: 82,
        unit: '%',
        status: 'warning'
      },
      {
        name: 'Disk Space',
        value: 68,
        unit: '%',
        status: 'normal'
      },
      {
        name: 'Network Load',
        value: 92,
        unit: '%',
        status: 'critical'
      }
    ]);

    setDbStats({
      totalUsers: 15234,
      totalGames: 89756,
      totalTournaments: 156,
      databaseSize: '2.3 GB',
      lastBackup: '2024-01-10 15:30:00'
    });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSqlExecute = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulation d'exécution de requête SQL
    setTimeout(() => {
      try {
        // Vérification basique de sécurité
        if (sqlQuery.toLowerCase().includes('drop') || 
            sqlQuery.toLowerCase().includes('truncate')) {
          throw new Error('Opérations destructives non autorisées');
        }

        // Mock results
        setQueryResults([
          { id: 1, username: 'user1', email: 'user1@example.com' },
          { id: 2, username: 'user2', email: 'user2@example.com' }
        ]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'normal':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Console d'Administration
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="admin console tabs"
        >
          <Tab label="Monitoring" />
          <Tab label="Logs Système" />
          <Tab label="Base de Données" />
          <Tab label="Outils" />
        </Tabs>
      </Paper>

      {/* Monitoring Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {metric.name}
                </Typography>
                <Typography variant="h4">
                  {metric.value}{metric.unit}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  color={getMetricStatusColor(metric.status) as any}
                  sx={{ mt: 1 }}
                />
                <Chip
                  label={metric.status}
                  color={getMetricStatusColor(metric.status) as any}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Actions Rapides
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {/* Logique de refresh */}}
              >
                Rafraîchir les Métriques
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {/* Logique de clear cache */}}
              >
                Vider le Cache
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      {/* Logs Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {/* Logique de refresh */}}
          >
            Actualiser
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {/* Logique d'export */}}
          >
            Exporter les Logs
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Niveau</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.level}
                      color={getLogLevelColor(log.level) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.source}</TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Database Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Statistiques Base de Données
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Utilisateurs
                  </Typography>
                  <Typography variant="h6">
                    {dbStats.totalUsers.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Parties
                  </Typography>
                  <Typography variant="h6">
                    {dbStats.totalGames.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Taille Base de Données
                  </Typography>
                  <Typography variant="h6">
                    {dbStats.databaseSize}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Dernière Sauvegarde
                  </Typography>
                  <Typography variant="h6">
                    {dbStats.lastBackup}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Requête SQL
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="SELECT * FROM users LIMIT 10;"
                sx={{ mb: 2 }}
              />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSqlExecute}
                  disabled={isLoading || !sqlQuery}
                >
                  Exécuter
                </Button>
              </Box>

              {isLoading && <LinearProgress sx={{ mb: 2 }} />}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {queryResults.length > 0 && (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {Object.keys(queryResults[0]).map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {queryResults.map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value: any, i) => (
                            <TableCell key={i}>{value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tools Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Maintenance
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {/* Logique de backup */}}
                  >
                    Lancer une Sauvegarde Complète
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    onClick={() => {/* Logique de maintenance */}}
                  >
                    Activer le Mode Maintenance
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => {/* Logique de reset */}}
                  >
                    Réinitialiser le Cache Redis
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Diagnostics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {/* Logique de test */}}
                  >
                    Tester les Connexions API
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {/* Logique de vérification */}}
                  >
                    Vérifier l'Intégrité des Données
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {/* Logique d'analyse */}}
                  >
                    Analyser les Performances
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default AdminConsole;
