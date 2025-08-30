namespace NaoBlocks.Engine.Generators
{
    /// <summary>
    /// Generates the students list export.
    /// </summary>
    public class StudentsList
        : ListReportGenerator
    {
        /// <summary>
        /// Generates the students list report.
        /// </summary>
        /// <param name="format">The export format.</param>
        /// <returns>The output <see cref="Stream"/> containing the generated data.</returns>
        public override async Task<Tuple<Stream, string>> GenerateAsync(ReportFormat format)
        {
            var generator = new Generator();
            await PopulateStudents(generator).ConfigureAwait(false);
            generator.Title = "Students List";
            generator.IsLandScape = true;
            var (stream, name) = await generator.GenerateAsync(format, "Student-List");
            return Tuple.Create(stream, name);
        }

        /// <summary>
        /// Checks if the report format is available.
        /// </summary>
        /// <param name="format">The format.</param>
        /// <returns>True if the format is available, false otherwise.</returns>
        public override bool IsFormatAvailable(ReportFormat format)
        {
            return format switch
            {
                ReportFormat.Excel => true,
                ReportFormat.Pdf => true,
                ReportFormat.Csv => true,
                ReportFormat.Text => true,
                _ => false,
            };
        }
    }
}