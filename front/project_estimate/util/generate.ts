import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';
import { ProjectVO } from 'project/domain';
import {
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { fileToView } from 'file-item';
import { projectEstimateData } from 'project_estimate/util/data';

export function generate(values: ProjectSystemEstimateParameter,
                         project: ProjectVO,
                         callback: (values: ProjectSystemEstimateParameter) => void
) {
  loadFile(
    `${location.origin}/file-item/template?fileName=estimate_template.docx`,
    async function (error,
                    content
    ) {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });
      const data = await projectEstimateData.setData(values, project);
      doc.setData(data);
      doc.render(data);

      values.file = fileToView(blobToFile(getBlob(doc), `견적서-${data.projectName}-${data.estimateNumber}.docx`));
      callback && callback(values);
    }
  );
}
