import { get as getGuarded } from 'lodash';
import {
  RunContext,
  CancellableTask,
  RunResult,
} from '../../../../../x-pack/legacy/plugins/task_manager/task';
import { MAPS_INGEST_TASK_TYPE } from '../../../constants';
import { Logger } from '../logger';
import { getExampleJson } from './get_example_json';

export const fakeSuricataIngestTask = (server, logger: Logger) => {
  const config = server.config();
  const { elasticsearch } = server.plugins;
  const { callWithRequest: callEs } = elasticsearch.getCluster('data');
  const fakeReq = {
    headers: { authorization: config.get('reporting_tools.ingestAuth') },
  };

  // TODO: putTemplate

  return {
    [MAPS_INGEST_TASK_TYPE]: {
      type: 'xpack_kibana_reportingtools',
      title: 'Ingest Maps Data',
      createTaskRunner({
        taskInstance: { params: taskParams, state: taskState },
      }: RunContext): CancellableTask {
        return {
          async run(): Promise<RunResult> {
            logger.info(`Task is running: ${JSON.stringify({ taskParams, taskState })}`);

            const nowDate = new Date();
            const [nowYear, nowMonth, nowDay] = [
              nowDate.getUTCFullYear(),
              nowDate.getUTCMonth() + 1,
              nowDate.getUTCDate(),
            ];

            // ingest data
            const esResponse = await callEs(fakeReq, 'index', {
              index: `filebeat-${nowYear}.${nowMonth}.${nowDay}`,
              body: getExampleJson(),
            });

            // calculate next run
            const nextDateObj = new Date(Date.now() + 2 * 60000); // 2 minutes from now
            const taskRuns = getGuarded(taskState, 'stats.runs', 0);

            return { state: { stats: { runs: taskRuns + 1 } }, runAt: nextDateObj };
          },
          async cancel(): Promise<void> {
            throw new Error("Can't cancel updateReportingStats!");
          },
        };
      },
    },
  };
};
